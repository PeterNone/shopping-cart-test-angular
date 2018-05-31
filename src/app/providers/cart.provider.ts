import { 
	ModalEvent, 
	MODAL_TYPE_SUCCESS, 
	MODAL_MESSEGE_PRODUCT_ADDED, 
	MODAL_TYPE_WARNING, 
	MODAL_MESSEGE_PRODUCT_IN_BASKET,
	MODAL_MESSEGE_BASKET_PRODUCT_REMOVED,
	MODAL_MESSEGE_BASKET_CLEARED,
	MODAL_MESSEGE_PURCHASE_SUCCESS,
	MODAL_MESSEGE_PURCHASE_ID,
	MODAL_TYPE_DANGER,
	MODAL_MESSEGE_PURCHASE_ERROR,
	MODAL_TYPE_INFO,
	MODAL_MESSEGE_BASKET_EMPTY,
	MODAL_MESSEGE_BASKET_EMPTY_CART,
	MODAL_MESSEGE_BASKET_PRODUCT_QUESTION,
	MODAL_MESSEGE_BASKET_QUESTION,
 } from './../components/modal/modal.model';
import { ModalService } from './../components/modal/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiProvider } from './api.provider';
import { Item } from './item.model';
import { Injectable, EventEmitter } from '@angular/core';
import { CartItem } from './cartitem.model';
import { Purchase } from './purchase.interface';

@Injectable()
export class CartProvider {
	cartChanged = new EventEmitter<void>();
	
	private cartItems = new Map();
	private total = 0;
	private totalItems = 0;
	
	constructor(private service: ApiProvider,
							private modal: ModalService) {}
	
	getCartItems():CartItem[] {
		return Array.from(this.cartItems.values());
	}
	
	getCartTotal():number {
		return this.total;
	}
	
	getCartTotalItems():number {
		return this.totalItems;
	}
	
	addItem(item: Item):void {
		if (!this.cartItems.has(item.ref)) {
			const cartItem = new CartItem(item.label, item.image, item.ref, item.cost, 1);
			this.cartItems.set(item.ref, cartItem);
			this.calculateTotal();
			
			const event = new ModalEvent(MODAL_TYPE_SUCCESS, `<b>${item.label}</b> ${MODAL_MESSEGE_PRODUCT_ADDED}`);
			this.modal.showModal(event);
		} else {
			const event = new ModalEvent(MODAL_TYPE_WARNING, `<b>${item.label}</b> ${MODAL_MESSEGE_PRODUCT_IN_BASKET}`);
			this.modal.showModal(event);
		}
	}
	
	changeQuantity(item: CartItem, qt: number):void {
		const cartItem: CartItem = this.cartItems.get(item.ref);
		
		// here we can add stock items availability check
		if (qt >= 0) {
			cartItem.qt = qt;
			this.calculateTotal();
		}
	}
	
	deleteItem(item: CartItem):void {
		const result = confirm(`${item.label} ${MODAL_MESSEGE_BASKET_PRODUCT_QUESTION}`);

		if (result === true) {
			const removed = this.cartItems.delete(item.ref);
			if (!removed) {
				console.warn(`${MODAL_MESSEGE_BASKET_EMPTY_CART} - ${item.ref} - ${item.label}`);			
			}
			this.calculateTotal();
			
			const event = new ModalEvent(MODAL_TYPE_SUCCESS, MODAL_MESSEGE_BASKET_PRODUCT_REMOVED);
			this.modal.showModal(event);
		}
	}
	
	deleteAllItem(skip: boolean = false):void {
		let result;
		
		if (!skip) {
			result = confirm(MODAL_MESSEGE_BASKET_QUESTION);
		}
		
		if (result === true || skip) {
			const removed = this.cartItems.clear();
			this.calculateTotal();
			
			const event = new ModalEvent(MODAL_TYPE_SUCCESS, MODAL_MESSEGE_BASKET_CLEARED);
			this.modal.showModal(event);
		}
	}
	
	purchaseCartItems():void {
		if (this.totalItems < 1) {
			const event = new ModalEvent(MODAL_TYPE_INFO, MODAL_MESSEGE_BASKET_EMPTY);
			this.modal.showModal(event);
			return;
		}
		
		const items = {
			total_cost: this.total,
			total_items: this.totalItems,
			items_ref: this.getCartItems().reduce((x, y) => {
				for (let i = 0; i < y.qt; i++) {
					x.push(y.ref);
				}
				return x;
			}, [])
		};
		
		const result = this.service.purchaseItems(items);
		
		result.subscribe(data => {
				this.deleteAllItem(true);
				
				const event = new ModalEvent(MODAL_TYPE_SUCCESS, `${MODAL_MESSEGE_PURCHASE_SUCCESS} ${MODAL_MESSEGE_PURCHASE_ID} <b>${data.id}</b>`);
				this.modal.showModal(event);
			},
		
			(err: HttpErrorResponse) => {
			if (err.error.error === 'NOT_FOUND') {
				const event = new ModalEvent(MODAL_TYPE_DANGER, MODAL_MESSEGE_PURCHASE_ERROR);
				this.modal.showModal(event);
			}
			console.log(err.error);
			console.log(err.name);
			console.log(err.message);
			console.log(err.status);
		});
	}
	
	
	private calculateTotal():void {
		let total = 0;
		let totalItems = 0;
		
		this.cartItems.forEach((value, key) => {
			total += value.cost * value.qt;
			totalItems += value.qt;
		});
		
		this.total = total;
		this.totalItems = totalItems;
		
		this.cartChanged.emit();
	}
}

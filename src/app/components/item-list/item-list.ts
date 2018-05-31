import { CartProvider } from './../../providers/cart.provider';
import { ApiProvider } from './../../providers/api.provider';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Item } from './../../providers/item.model';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
	items: Item[];
	subscription;
  
	constructor(private service: ApiProvider, private cart: CartProvider ) {}
	
	ngOnInit():void {
		this.items = this.service.getItems();
		
		if (!this.items) {
			this.subscription = this.service.itemsChanged
			.subscribe(
				(items: Item[]) => {
					this.items = items;
				}
			);
		}
	}
	
	ngOnDestroy():void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
	
	addToCart(item: Item):void {
		this.cart.addItem(item);
	}
}

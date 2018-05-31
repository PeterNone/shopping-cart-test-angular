export const MODAL_TYPE_SUCCESS = 'success';
export const MODAL_TYPE_INFO = 'info';
export const MODAL_TYPE_WARNING = 'warning';
export const MODAL_TYPE_DANGER = 'danger';

export const MODAL_MESSEGE_PRODUCT_ADDED = 'Product added to the basket';
export const MODAL_MESSEGE_PRODUCT_IN_BASKET = `Product is already in the basket.<br>You can change its quantity in the <b>CHECKOUT</b>.`;
export const MODAL_MESSEGE_BASKET_PRODUCT_REMOVED = 'Product removed from the basket';
export const MODAL_MESSEGE_BASKET_PRODUCT_QUESTION = 'Do you really whant to remove this item from your Basket?';
export const MODAL_MESSEGE_BASKET_CLEARED = 'All Products removed from the basket';
export const MODAL_MESSEGE_BASKET_QUESTION = 'Do you really whant to remove ALL products from your Basket?';
export const MODAL_MESSEGE_BASKET_EMPTY = 'Your basket is empty.';
export const MODAL_MESSEGE_BASKET_EMPTY_CART = 'No Item In the Cart';
export const MODAL_MESSEGE_PURCHASE_SUCCESS = 'Purchase SUCCESS. Thank you.';
export const MODAL_MESSEGE_PURCHASE_ID = '<br>Your reference number is:';
export const MODAL_MESSEGE_PURCHASE_ERROR = 'Purchase FAILED';



export class ModalEvent {
	constructor(
		public type: string,
		public message: string,
		public delay: number = 2500
	) { }
}

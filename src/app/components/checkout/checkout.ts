import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartItem } from './../../providers/cartitem.model';
import { CartProvider } from './../../providers/cart.provider';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  total = 0;
  totalItems = 0;
  subscription;
  
  constructor(private cartService: CartProvider) {}
  
  ngOnInit():void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();
    this.totalItems = this.cartService.getCartTotalItems();
    
    this.subscription = this.cartService.cartChanged
      .subscribe(
        () => {
          this.cartItems = this.cartService.getCartItems();
          this.total = this.cartService.getCartTotal();
          this.totalItems = this.cartService.getCartTotalItems();
        }
      );
  }
  
  ngOnDestroy():void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  deteleAllCartItems():void {
    this.cartService.deleteAllItem();
  }
  
  purchaseAllCartItems():void {
    this.cartService.purchaseCartItems();
  }
}

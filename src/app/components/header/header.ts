import { Component, OnInit, OnDestroy} from '@angular/core';

import { CartProvider } from './../../providers/cart.provider';

@Component({
  selector: 'header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  totalItems = 0;
  
  subscription;
  
  constructor(private cartService: CartProvider) {}
  
  ngOnInit():void {
    this.totalItems = this.cartService.getCartTotalItems();
    
    this.subscription = this.cartService.cartChanged
      .subscribe(
        () => {
          this.totalItems = this.cartService.getCartTotalItems();
        }
      );
  }
  
   
  ngOnDestroy():void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
import { CartItem } from './../../../providers/cartitem.model';
import { Component, OnInit, Input } from '@angular/core';
import { CartProvider } from '../../../providers/cart.provider';

@Component({
  selector: '[checkout-item]',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss']
})
export class CheckoutItemComponent implements OnInit {
  @Input() item: CartItem;
  quantity: number;

  constructor(private cartService: CartProvider) { }

  ngOnInit() {
    if(this.item) {
      this.quantity = this.item.qt;
    }
  }
  
  chnageClickHandler(event) {
    this.quantity += event;
    if(this.quantity < 0) {
      this.quantity = 0;
    }
    this.cartService.changeQuantity(this.item, this.quantity);
  }
  
  deteleCartItem() {
    this.cartService.deleteItem(this.item);
  }
}

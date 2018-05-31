import { Item } from './../../providers/item.model';
import { CartProvider } from './../../providers/cart.provider';
import { ItemDesc } from './../../providers/itemdesc.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ApiProvider } from '../../providers/api.provider';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'item-desc',
  templateUrl: './item-desc.html',
  styleUrls: ['./item-desc.scss']
})
export class ItemDescComponent implements OnInit, OnDestroy {
  itemDesc: ItemDesc;
  subscription;
  
  constructor(private service: ApiProvider,
              private cartService: CartProvider,
              private route: ActivatedRoute) {}
  
  ngOnInit():void {
    this.subscription = this.service.itemChanged
      .subscribe(
        (itemDesc: ItemDesc) => {
          this.itemDesc = itemDesc;
        }
      );
          
    this.service.getItem(this.route.snapshot.params['ref']);
  }
  
  ngOnDestroy():void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  addToCart():void {
    const item = new Item(
      this.itemDesc.label,
      this.itemDesc.image,
      this.itemDesc.reference,
      this.itemDesc.cost
    );
    
    this.cartService.addItem(item);
  }
}

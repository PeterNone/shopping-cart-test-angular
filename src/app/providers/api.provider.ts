import { CartProvider } from './cart.provider';
import { CartItem } from './cartitem.model';
import { Item } from './item.model';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ItemDesc } from './itemdesc.model';
import { Observable } from 'rxjs/Observable';
import { Purchase } from './purchase.interface';

@Injectable()
export class ApiProvider {
  itemsChanged = new EventEmitter<Item[]>();
  itemChanged = new EventEmitter<ItemDesc>();
  
  private API_URL: string = 'http://localhost:3001/api';
  
  private items: Item[];
  
  constructor(private http: HttpClient) {
    this.init();
  }
  
  init():void {
    if (!this.items) {
      this.http.get( `${this.API_URL}/items`).subscribe(data => {
        this.items = Object.keys(data).map( k => new Item(
          data[k].label,
          data[k].image,
          data[k].ref,
          data[k].cost
        ) );
        
        this.itemsChanged.emit(this.items.slice());
      });
    }    
  }
  
  
  getItems():Item[] | null {
    if (this.items) {
      return this.items.slice();
    } else {
      return null;
    }
  }
  
  
  getItem(ref: number):void {
    this.http.get(`${this.API_URL}/items/${ref}`).subscribe((data) => {
      const t = data[0] as ItemDesc;
      
      const itemDesc = new ItemDesc(
        t.brand,
        t.cost,
        t.description,
        t.image,
        t.items_available,
        t.label,
        t.model,
        t.reference
      );
      this.itemChanged.emit(itemDesc);
    });
  }
  
  purchaseItems(items):Observable<Purchase> | null {
    return this.http.post<Purchase>(`${this.API_URL}/purchase`, items);
  }
}

import { ModalEvent } from './modal.model';
import { ModalService } from './modal.service';
import { Component, OnInit, animate, trigger, transition, style } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('easeInOut', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('0.3s ease-in-out', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('0.7s ease-in-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {
  show = false;
  timeout;
  message = '';
  type = '';

  constructor(private modal: ModalService) { }

  ngOnInit():void {
    this.modal.dispatcher.subscribe((event: ModalEvent) => {
      this.type = event.type;
      this.message = event.message;
      
      this.showModal(event.delay);
    });
  }
  
  private showModal(delay: number):void {
    this.show = true;
    
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.timeout = setTimeout(() => {
      this.show = false;
    }, delay);
  }
}

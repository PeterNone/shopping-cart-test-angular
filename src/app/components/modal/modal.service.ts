import { ModalEvent } from './modal.model';
import { EventEmitter } from '@angular/core';

export class ModalService {
	dispatcher = new EventEmitter<ModalEvent>();
	
	showModal(event: ModalEvent):void {
		this.dispatcher.emit(event);
	}
}

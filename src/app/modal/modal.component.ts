import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../cards/cards.component';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

	constructor() { }
	
    @Input() card: Card;

    @Output() closeDialogBoxEmitter = new EventEmitter();
    
    @Output() makeActionEmitter = new EventEmitter();

    closeDialogBox(): void{
        this.closeDialogBoxEmitter.emit();
    }

    makeAction(){
        this.makeActionEmitter.emit();
    }

    ngOnInit(): void {
        this.card  = new Card(undefined, undefined);
    }

}

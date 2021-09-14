import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Card } from "../cards.component";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

	constructor() { }
	
    @Input() card:Card;
    @Output() delete = new EventEmitter<Card>();
    @Output() edit = new EventEmitter<Card>();
    
    deleteCard():void{
        this.delete.emit(this.card);
    }

    editCard():void{
        this.edit.emit(this.card);
    }

    getColor():string{
        return `rgba(${this.card.background["r"]}, ${this.card.background["g"]}, ${this.card.background["b"]}, ${this.card.background["a"]|255})`
    }

    ngOnInit(): void {
             
    }

}

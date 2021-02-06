import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { Card } from "../services/Card/card.service";
import { CardStorage } from "../services/CardStorage/card-storage.service";
import { Color } from "../services/Color/color.service";

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, AfterViewChecked {

    constructor() { }

    modalCard:Card;
    cs:CardStorage = new CardStorage(true);
    filteredCS:CardStorage = new CardStorage();
    isToggledGroupView:Boolean = false;
    filter:Array<String> = new Array();
    filterObjects: Set<String> = new Set();
    filterBy = "header";

    setRandomStyles(): void{
        setRandomLeftMargin();
        setRandomRotate();

        function setRandomLeftMargin(): void{
            let cards = document.querySelectorAll<HTMLElement>(".card");
            cards.forEach(card => {
                let magicValue = 30;
                card.style.marginLeft = Math.floor(Math.random() * magicValue - magicValue/2)+"px";
            });
        }
    
        function setRandomRotate(){
            let cards = document.querySelectorAll<HTMLElement>(".card");
            cards.forEach(card => {
                let magicValue = 8;
                card.style.transform = `rotate(${Math.floor(Math.random() * magicValue - magicValue/2)}deg)`;
            });
        }
    }

    toggleDialogBox(reason=null): void{
        if(reason=="edit"){
            this.makeActionDialogBox = this.editCard;
        }
        else if(reason=="add"){
            this.makeActionDialogBox = this.addCard;
        }
        let modal = document.querySelector(".modal")
        if(modal.classList.contains("modal__active")) {
            modal.classList.add("modal__deactive");
            modal.classList.remove("modal__active");
        }
        else{
            modal.classList.add("modal__active");
            modal.classList.remove("modal__deactive");
        }
    }

    onDelete(card): void{
        let indexToBeDeleted = this.cs.Values().indexOf(card);
        this.cs.Delete(indexToBeDeleted);
        this.onSelectChange();
    }

    onSelectChange(): void{
        let select = document.querySelector<HTMLSelectElement>(".header__select");
        this.filteredCS = this.cs;
        this.filter = [];
        if(select.value == "header"){
            this.filterObjects = this.cs.UniqueHeaders();
        }
        else if(select.value == "author"){
            this.filterObjects = this.cs.UniqueAuthors();
        }
        this.filterBy = select.value;
    }

    onEdit(card): void{
        this.modalCard = card;
        this.toggleDialogBox("edit");
    }

    makeActionDialogBox(): void{}

    private addCard(): void{
        let card = new Card(
            document.querySelector<HTMLInputElement>("#addCard__header").value,
            document.querySelector<HTMLInputElement>("#addCard__text").value,
            document.querySelector<HTMLInputElement>("#addCard__author").value,
            new Color(document.querySelector<HTMLInputElement>("#addCard__bg").value)
        );
        this.cs.Add(card);
        this.onSelectChange();
    }

    private editCard(): void{
        let card = new Card(
            document.querySelector<HTMLInputElement>("#addCard__header").value,
            document.querySelector<HTMLInputElement>("#addCard__text").value,
            document.querySelector<HTMLInputElement>("#addCard__author").value,
            new Color(document.querySelector<HTMLInputElement>("#addCard__bg").value)
        );
        this.cs.Update(this.cs.Values().indexOf(this.modalCard), card);
        this.modalCard = card;
        this.onSelectChange();
    }

    activateFilter(event: Event): void{
        let target = event.target as HTMLElement;
        if(target.classList.contains("active")){
            target.classList.remove("active");
            this.filter.splice(this.filter.indexOf(target.innerText),1);
        }
        else{
            target.classList.add("active");
            this.filter.push(target.innerText);
        }
        if(this.filter.length > 0){
            this.filterCards();
        }
        else{
            this.filteredCS = this.cs;
        }
    }

    filterCards(): void{
        this.filteredCS = new CardStorage();
        if(this.filterBy == "header"){
            this.cs.Values().forEach(card => {
                if(this.filter.includes(card.header)){
                    this.filteredCS.Add(card);
                }
            })
        }
        else if(this.filterBy == "author"){
            this.cs.Values().forEach(card => {
                if(this.filter.includes(card.author)){
                    this.filteredCS.Add(card);
                }
            })
        }
    }

    ngOnInit(): void {
        this.cs.Import();
        this.filteredCS = this.cs;
        this.filterObjects = this.cs.UniqueHeaders();
    }

    ngAfterViewChecked(): void{
        this.setRandomStyles();
    }
}
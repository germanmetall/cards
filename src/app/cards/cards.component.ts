import { Component, OnInit, AfterViewChecked} from '@angular/core';
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
        console.log(card);
        let indexToBeDeleted = this.cs.Values().indexOf(card);
        this.cs.Delete(indexToBeDeleted);
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
            document.querySelector<HTMLInputElement>("#addCard__header").value.trim(),
            document.querySelector<HTMLInputElement>("#addCard__text").value,
            document.querySelector<HTMLInputElement>("#addCard__author").value.trim(),
            new Color(document.querySelector<HTMLInputElement>("#addCard__bg").value)
        );
        console.log(card);
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

export class Card {
    constructor(header, text, author="", background=new Color("#b0b0b0")) {
        this.header = header;
        this.text = text;
        this.author = author;
        this.date = Date.now();
        this.background = background;
    }

    public header:String;
    public text:String;
    public date:number; //in timestamp
    public author:String;
    public background:Color;
}

class Color {
    //  #rrggbb in hex
    constructor(hex: string) {
        if(hex[0]==="#"){
            this.r = +("0x"+hex[1]+hex[2]);
            this.g = +("0x"+hex[3]+hex[4]);
            this.b = +("0x"+hex[5]+hex[6]);
            if(hex.length>7){
                this.a = +("0x"+hex[7]+hex[8]);
            }
        }
        else{
            alert("Wrong color!");
            console.error("Error in Color constructor");
        }
    }

    private r:number;
    private g:number;
    private b:number;
    private a:number;
}

class CardStorage {
    constructor(canLocallyStore=false) {
        this.canLocallyStore = canLocallyStore;
    }

    private canLocallyStore:boolean;
    private cards:Array<Card> = new Array();

    public Values():Array<Card>{
        return this.cards;
    }

    public UniqueHeaders():Set<String>{
        let headers = new Set<String>();
        this.cards?.forEach(card => {
            headers.add(card.header.trim());
        });
        return headers;
    }

    public UniqueAuthors():Set<String>{
        let authors = new Set<String>();
        this.cards.forEach(card => {
            authors.add(card.author);
        });
        return authors;
    }

    public Add(cards:Array<Card> | Card):void{
        if(cards instanceof Array){
            cards?.forEach(card => {
                this.Add(card);
            });
        }
        else{
            console.log(this.cards);
            if(!this.cards) this.cards = new Array<Card>();
            this.cards.push(cards);
            this.Export();
        }
    }

    public Delete(index:Array<number> | number):void{
        if(index instanceof Array){
            index.forEach(number => {
                this.Delete(number);
            })
        }
        else{
            this.cards.splice(index, 1);
            this.Export();
        }
    }

    public Update(index:number, card:Card):void{
        this.cards[index] = card;
        this.Export();
    }

    public Export():boolean{
        if(this.canLocallyStore){
            let convertedString = JSON.stringify(this.Values());
            try{
                localStorage.setItem("cards", convertedString);
                return true;
            }
            catch(e){
                console.error(e);
                alert("Error during import operation");
                return false;
            }
        }
    }

    public Import():boolean{
        if(this.canLocallyStore){
            try{
                let convertedString = JSON.parse(localStorage.getItem("cards"));
                this.cards = convertedString;
                return true;
            }
            catch(e){
                console.error(e);
                alert("Error during export operation");
                return false;
            }
        }
    }
}
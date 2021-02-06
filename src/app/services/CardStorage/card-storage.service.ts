import { Injectable } from '@angular/core';
import { Card } from "../Card/card.service";

@Injectable({
  providedIn: 'root'
})
export class CardStorage {
  	constructor(canLocallyStore=false) {
        this.canLocallyStore = canLocallyStore;
        this.cards = new Array();
        console.log("CardStorage constructor!", this.cards);
  	}

    private canLocallyStore:boolean;
    private cards:Array<Card> = new Array();

    public Values():Array<Card>{
        return this.cards;
    }

    public UniqueHeaders():Set<String>{
        let headers = new Set<String>();
        this.cards?.forEach(card => {
            headers.add(card.header);
        });
        return headers;
    }

    public UniqueAuthors():Set<String>{
        let authors = new Set<String>();
        this.cards?.forEach(card => {
            authors.add(card.author);
        });
        return authors;
    }

    public Add(cards:Array<Card> | Card):void{
        console.log(this.Values(), cards);
        if(this.cards==null){
            this.cards = new Array<Card>();
        }
        if(cards instanceof Array){
            cards?.forEach(card => {
                this.Add(card);
            });
        }
        else{
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
            }
            catch(e){
                console.error(e);
                alert("Error during import operation");
                return false;
            }
        }
        return true;
    }

    public Import():boolean{
        if(this.canLocallyStore){
            try{
                let convertedString = JSON.parse(localStorage.getItem("cards"));
                this.cards = convertedString;
            }
            catch(e){
                console.error(e);
                alert("Error during export operation");
                return false;
            }
        }
        return true;
    }
}

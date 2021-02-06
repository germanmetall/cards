import { Injectable } from '@angular/core';
import { Color } from "../Color/color.service";

@Injectable({
  providedIn: 'root'
})
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

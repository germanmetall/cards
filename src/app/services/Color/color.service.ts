import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Color {
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
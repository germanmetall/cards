import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-quadric-layout',
    templateUrl: './quadric-layout.component.html',
    styleUrls: ['./quadric-layout.component.scss']
})
export class QuadricLayoutComponent implements OnInit {

    constructor() { }

    isToggled = false;

	toggleExpandScreen(e: Event){
        let size = 90;
        let number = 0;
        e.stopPropagation();
        e.composedPath().forEach((node: HTMLElement) => {
            if(node.className == "quadricLayout__screen") {
                node.parentNode.childNodes.forEach((el, i) => {
                    if(node===el) number=i;
                })
            }
        });

        if(!this.isToggled){
            document.querySelectorAll<HTMLElement>(".quadricLayout__screen").forEach((screen, i) => {
                if(i==number){
                    screen.style.width = `${size}vw`;
                    screen.style.height = `${size}vh`;
                    (screen.children[0] as HTMLElement).style.overflowY = "auto";
                    screen.children[0].classList.add("maximised");
                }
                else{
                    screen.style.width = `${100 - size - 2}vw`;
                    screen.style.height = `${100 - size - 2}vh`;
                    screen.children[0].classList.add("minimised");
                }
            });
        }
        else{
            document.querySelectorAll<HTMLElement>(".quadricLayout__screen").forEach(screen => {
                screen.style.width = "calc(50vw - 5vh)";
                screen.style.height = "45vh";
                screen.children[0].classList.remove("minimised");
                screen.children[0].classList.remove("maximised");
                (screen.children[0] as HTMLElement).style.overflowY = "hidden";
            });
        }
        this.isToggled = !this.isToggled;
	}
    
    ngOnInit(): void {

    }

}

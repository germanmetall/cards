import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { QuadricLayoutComponent } from './quadric-layout/quadric-layout.component';

const routes: Routes = [
    {path: "cards", component: CardsComponent},
    {path: "quadricLayout", component: QuadricLayoutComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

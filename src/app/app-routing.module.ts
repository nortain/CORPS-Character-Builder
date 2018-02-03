import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CharacterAttributesComponent} from "./character-sheet/character-attributes/character-attributes.component";

const routes: Routes = [
  {path: 'character', component: CharacterAttributesComponent},
  {path: '', redirectTo: 'character', pathMatch: 'full'},
  {path: '**', redirectTo: 'character', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteComponent } from './composants/arrondissement/carte/carte.component';
import { HomeComponent } from './composants/home/home.component';
import { TableauComponent } from './composants/arrondissement/tableau/tableau.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'tableau/:insee/:id',   component: TableauComponent },
  { path: 'carte/:insee/:id',   component: CarteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

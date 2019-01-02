import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './composants/app.component';
import { MaterialModule } from './material.module';
import { CarteComponent } from './composants/arrondissement/carte/carte.component';
import { HomeComponent } from './composants/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableauComponent } from './composants/arrondissement/tableau/tableau.component';
import { HeaderComponent } from './composants/arrondissement/header/header.component';
import { ButtonLegendComponent } from './composants/arrondissement/carte/button-legend/button-legend.component';


@NgModule({
   declarations: [
      AppComponent,
      CarteComponent,
      HomeComponent,
      TableauComponent,
      HeaderComponent,
      ButtonLegendComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

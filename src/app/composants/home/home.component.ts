import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';


import {HttpRequestsService} from 'src/app/services/httpRequests.service';
import { NomArrondissements} from 'src/app/classes/nomArrondissements';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  arrondCtrl = new FormControl();
  arrondissments: NomArrondissements[];
  arrondissmentsFiltres: NomArrondissements[];

  constructor(
    private _httpRequestsService: HttpRequestsService,
    private _router : Router
  ) {
    this._httpRequestsService.getListeArrondissements().subscribe((res: NomArrondissements[]) => {
      this.arrondissments = res; // ensemble des valeurs stockées
      this.arrondissmentsFiltres = res; // valeurs correspondants au filtre    
    })
  }

  ngOnInit(){
    this.initFilterCtrl();
  }

  initFilterCtrl(){
    this.arrondCtrl.valueChanges.subscribe((value : string)=> {
      const valeurInput = value.toLowerCase();
       this.arrondissmentsFiltres = this.arrondissments.filter((arrond)=> {
         if(
           arrond.insee.toLowerCase().includes(valeurInput)|| 
           arrond.name.toLowerCase().includes(valeurInput)||
           arrond.libelle.toLowerCase().includes(valeurInput)
           ){
          return arrond;
         }  
       })
      })
  }
  onSelectionChanged(){ 
    this._router.navigate(['/tableau/'+this.arrondCtrl.value + '/all']);
  }

  navigateFakeData(){
    this._router.navigate(['/tableau/fake/all'])
  }
}

import { Injectable } from '@angular/core';
import { NomArrondissements } from '../classes/nomArrondissements';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
arrondissementSelect: NomArrondissements;

constructor() {}
getArrondissementSelect(){
  return this.arrondissementSelect;
}

setArrondissementSelect(val : NomArrondissements){
  this.arrondissementSelect = val;
}

}

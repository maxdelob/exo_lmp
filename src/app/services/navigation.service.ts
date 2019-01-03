import { Injectable, Output, EventEmitter } from '@angular/core';
import { NomArrondissements } from '../classes/nomArrondissements';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
@Output() closeLegendeCarto: EventEmitter<void> = new EventEmitter();
@Output() filterCartoTaille: EventEmitter<string[]> = new EventEmitter();
constructor() {}
}

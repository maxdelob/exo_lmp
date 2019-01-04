import { Component, OnInit, ViewChild } from '@angular/core';
import { TailleEntr } from './../../../../classes/tailleEntr';
import { NavigationService } from 'src/app/services/navigation.service';
import { HttpRequestsService } from 'src/app/services/httpRequests.service';


@Component({
  selector: 'app-button-legend',
  templateUrl: './button-legend.component.html',
  styleUrls: ['./button-legend.component.css']
})
export class ButtonLegendComponent implements OnInit {
  @ViewChild('button0') test :any

  arrTailles : any = [];
  tailles : TailleEntr[] = [];
  constructor(
    private _httpRequestsService : HttpRequestsService,
    private _navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.initListeFiltres();
  }

  initListeFiltres(){
    this._httpRequestsService.getListeTaille().subscribe((res : string []) => {
      this.arrTailles = res;
      res.forEach((element, index)=> {
        const taille : TailleEntr = {nom : element, url :`assets/marker${index + 1}.svg`}
        this.tailles.push(taille); 
      });
    })
  }

  toggleFiltre(e : any){
    this._navigationService.filterCartoTaille.emit(e.value)
  }

  closeLegende(){
    this._navigationService.closeLegendeCarto.emit()
  }

}

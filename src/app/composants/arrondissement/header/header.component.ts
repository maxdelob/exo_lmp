import { Component, OnInit} from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { NomArrondissements } from 'src/app/classes/nomArrondissements';
import { HttpRequestsService } from 'src/app/services/httpRequests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  arrondissementSelect : NomArrondissements
  constructor(
    private _navigationService: NavigationService,
    private _httpRequestsService : HttpRequestsService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.initListeArrondissement();
  }

  retourHome(){
    this._router.navigate(["/"]);
  }

  toggleNavigation(route : string) {
    if(route == "carte" && this._router.url.split("/")[1] != "carte"){
      this._router.navigate(["/carte/"+this.arrondissementSelect.insee + "/all"]);
    }
    if(route == "tableau" && this._router.url.split("/")[1] != "tableau"){
      this._router.navigate(["/tableau/"+this.arrondissementSelect.insee]);
    }
  }

      
  initListeArrondissement() {
    this.arrondissementSelect = this._navigationService.getArrondissementSelect();
    if(!this.arrondissementSelect) { // si arrond nul => reload de la page sans passé par la home
    this._httpRequestsService.getListeArrondissements().subscribe((res: NomArrondissements[]) => {
      res.forEach(arrond => {
        if(arrond.insee === this._router.url.split('/')[2]) {
          this.arrondissementSelect = arrond;
        }
      });
    })
    }
  }
}

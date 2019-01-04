import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { NomArrondissements} from 'src/app/classes/nomArrondissements';
import {HttpRequestsService} from 'src/app/services/httpRequests.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  arrondissementSelect: NomArrondissements;
  isRouteTableau: boolean;
  isRouteCarte: boolean;
  constructor(
    private _httpRequestsService: HttpRequestsService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.initListeArrondissement();
    if (this._router.url.split("/")[1] == "carte") {
      this.isRouteTableau = false;
      this.isRouteCarte = true
    } else if (this._router.url.split("/")[1] == "tableau") {
      this.isRouteTableau = true;
      this.isRouteCarte = false;
    }
  }

  retourHome() {
    this._router.navigate(["/"]);
  }

  toggleNavigation(route: string) {
    if (route == "carte" && this._router.url.split("/")[1] != "carte") {
      this._router.navigate(["/carte/" + this._router.url.split("/")[2] + "/all"]);
    }
    if (route == "tableau" && this._router.url.split("/")[1] != "tableau") {
      this._router.navigate(["/tableau/" + this._router.url.split("/")[2] + "/all"]);
    }
  }
  
  initListeArrondissement() {
    if (!this.arrondissementSelect && this._router.url.split("/")[2] != "fake") { // si arrond nul => reload de la page sans passé par la home
      this._httpRequestsService.getListeArrondissements().subscribe((res: NomArrondissements[]) => {
        res.forEach(arrond => {
          if (arrond.insee === this._router.url.split('/')[2]) {
            this.arrondissementSelect = arrond;
          }
        });
      })
    }
  }
}

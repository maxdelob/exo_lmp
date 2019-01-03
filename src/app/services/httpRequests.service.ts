import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

constructor(
  private _http: HttpClient
) {}

getArrondisement(insee : string){
  return this._http.get(environment.baseUrl + "/api/arrondissement/" + insee);
}

getEntreprise(insee : string, row_id: string){
  if(insee == "fake") {
    return this._http.get(environment.baseUrl + "/fakeDataGeoOne/" + row_id);
  }
  else {
    return this._http.get(environment.baseUrl + "/api/entreprise/" + insee + '/' + row_id);
  }
}

getEntreprises(insee : string){
  if(insee == "fake") {
    return this._http.get(environment.baseUrl + "/fakeDataGeo");
  } else {
    return this._http.get(environment.baseUrl + "/api/entreprises/" + insee);
  }
}

getListeArrondissements(){
  return this._http.get(environment.baseUrl + "/api/listeArrondissements");
}

getListeTaille(){
  return this._http.get(environment.baseUrl + "/api/listeTailleEntr");
}

getEntreprisesTableau(insee : string){
  if(insee == "fake") {
    return this._http.get(environment.baseUrl + "/fakeDataEntreprise");
  } else {
    return this._http.get(environment.baseUrl + "/api/getEntrepriseByInsee/" + insee);
  }
}



}

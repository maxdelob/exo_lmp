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

getEntreprises(insee : string){
  return this._http.get(environment.baseUrl + "/api/entreprises/" + insee);
}

getEntreprise(insee : string, row_id: string){
  return this._http.get(environment.baseUrl + "/api/entreprise/" + insee + '/' + row_id);
}
getListeArrondissements(){
  return this._http.get(environment.baseUrl + "/api/listeArrondissements");
}

getEntreprisesTableau(insee : string){
  return this._http.get(environment.baseUrl + "/api/getEntrepriseByInsee/" + insee);
}
}

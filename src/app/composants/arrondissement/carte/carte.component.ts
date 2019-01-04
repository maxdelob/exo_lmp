import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { FeatureCollection, Feature} from 'geojson';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestsService } from '../../../services/httpRequests.service';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  @ViewChild("map") mapElm: ElementRef;
  @ViewChild('sidenav') public legendSideNav: MatSidenav;

  map: L.Map;
  insee: string;
  row_id: string;
  allEntrepisesMarker: L.Marker[] = [];
  entreprisesMarkers: L.Marker[] = [];
  arrondissement: any; // TO DO clean that
  markerClusters = L.markerClusterGroup();

  constructor(
    private _httpRequestsService: HttpRequestsService,
    private _navigationService: NavigationService,
    private _route: ActivatedRoute,
    private _snackBar :  MatSnackBar
  ) {

  this._navigationService.closeLegendeCarto.subscribe(()=> {
    this.legendSideNav.close();
  })

  this._navigationService.filterCartoTaille.subscribe((valeurFiltre : string[]) => {
   this.filterLegende(valeurFiltre);
  })
  }

  ngOnInit() {
    this.getRouteParams();
    this.createMap();
    if(this.row_id == 'all') {this.loadEntreprises();} else { this.loadEntreprise()}
    if(this.insee != 'fake') {this.loadArrondissement();}
  }

  getRouteParams() {
    this._route.paramMap.pipe().subscribe((res: any) => {
      this.insee = res.params.insee;
      this.row_id = res.params.id;
    })
  }

  createMap() {
    this.map = L.map(this.mapElm.nativeElement).setView([48.862721502671945, 2.343451360908716], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  loadArrondissement() {
    const myStyle = {
      "fillColor": "rgba(0,0,0,0)",
      "color": "#fa7268",
      "weight": 3,
      "opacity": 1
    };

    this._httpRequestsService.getArrondisement(this.insee).subscribe((res: FeatureCollection) => {      
      this.arrondissement = L.geoJSON(res.features[0], { style: myStyle}).addTo(this.map);
      if (this.row_id == "all") {
        this.zoomToArrondissement();
      }
    })
  }

  loadEntreprises() {
    this._httpRequestsService.getEntreprises(this.insee).subscribe((res: FeatureCollection) => {
      res.features.forEach((feature: any) => { // erreur @types/geojson -> coordinates not find in Geometry
        const marker = new L.Marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
          icon: this.computeIcon(feature)
        });
        const url = `/tableau/${this.insee}/${feature.properties.row_id}`;
        marker.bindPopup(`${feature.properties.nom}<br>${feature.properties.taille}<br><a href=${url}>Voir tableau</a>`);
        marker.feature = feature;
        this.entreprisesMarkers.push(marker);
        this.allEntrepisesMarker.push(marker);
        this.markerClusters.addLayer(marker);
      });
      this.markerClusters.addTo(this.map);
      if(this.insee = "fake") {
        this.map.fitBounds(this.markerClusters.getBounds())
      }  
    })
  }

  loadEntreprise(){
     this._httpRequestsService.getEntreprise(this.insee, this.row_id).subscribe((res: FeatureCollection) => {        
      res.features.forEach((feature : any)=> {
        if(feature.properties.id = this.row_id){
          const marker = new L.Marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            icon: this.computeIcon(feature)
          });
          const url = `/tableau/${this.insee}/${feature.properties.id}`;
          marker.bindPopup(`${feature.properties.nom}<br>${feature.properties.taille}'<br><a href=${url}>Voir tableau</a>`);
          marker.feature = feature;
          marker.addTo(this.map);
          marker.openPopup();
          this.map.setView([marker.feature.geometry.coordinates[1], marker.feature.geometry.coordinates[0]], 19);
          const snackBarRef = this._snackBar.open(feature.properties.nom, "Toutes les entreprises");
          snackBarRef.onAction().subscribe(() => {
            this.map.removeLayer(marker);
            this.loadEntreprises();
            this.zoomToArrondissement();
          })
          this._navigationService.closeLegendeCarto.emit();
        }
      })
    })
  }

  computeIcon(props: Feature) {
    let urlIcon: string;
    switch (props.properties.taille) {
      case "00 - 0 salarié":
        urlIcon = 'assets/marker1.svg';
        break;
      case "01 - 1 ou 2 salariés":
        urlIcon = 'assets/marker2.svg';
        break;
      case "02 - 3 à 5 salariés":
        urlIcon = 'assets/marker3.svg';
        break;
      case "03 - 6 à 9 salariés":
        urlIcon = 'assets/marker4.svg';
        break;
      case "11 - 10 à 19 salariés":
        urlIcon = 'assets/marker5.svg';
        break;
      case "12 - 20 à 49 salariés":
        urlIcon = 'assets/marker6.svg';
        break;
      case "21 - 50 à 99 salariés":
        urlIcon = 'assets/marker7.svg';
        break;
      case "22 - 100 à 199 salariés":
        urlIcon = 'assets/marker8.svg';
        break;
      case "31 - 200 à 249 salariés":
        urlIcon = 'assets/marker9.svg';
        break;
      case "32 - 250 à 499 salariés":
        urlIcon = 'assets/marker10.svg';
        break;
      case "41 - 500 à 999 salariés":
        urlIcon = 'assets/marker11.svg';
        break;
      case "NN - Unités non employeuses":
        urlIcon = 'assets/marker12.svg';
        break;
    }
    const icon = L.icon({
      iconUrl: urlIcon,
      iconSize: [38, 95],
      popupAnchor: [0, -15]
    });
    return icon
  }

  openLegend() {
    this.legendSideNav.open();
  }

  zoomToArrondissement(){
    this.map.fitBounds(this.arrondissement.getBounds());
  }

  filterLegende(valeurFiltre : string[]){
    this.markerClusters.removeLayers(this.entreprisesMarkers);
    this.entreprisesMarkers = this.allEntrepisesMarker;
    const tempArr : L.Marker[] = [];
    this.entreprisesMarkers.forEach((marker)=> {
      if(valeurFiltre.includes(marker.feature.properties.taille)){
        tempArr.push(marker);
        this.markerClusters.addLayer(marker);
      }
    })
    this.entreprisesMarkers = tempArr;
  }

}

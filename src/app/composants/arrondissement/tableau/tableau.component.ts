import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { HttpRequestsService } from 'src/app/services/httpRequests.service';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/classes/Entreprise';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  codeInsee: string;
  row_id: string;
  filterInput = new FormControl();
  isFilterEmpty = true;
  displayedColumns: string[] = ["row_id", "nom","taille","categorie","adresse","coord", "map"];
  dataSource: MatTableDataSource<Entreprise>;
  @ViewChild("filterTable") filterTable: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _httpRequestService : HttpRequestsService,
    private _router: Router
  ) {
    this.codeInsee = this._router.url.split('/')[2];
    this.row_id = this._router.url.split('/')[3];
    this._httpRequestService.getEntreprisesTableau(this.codeInsee).subscribe((res : Entreprise []) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      if(this.row_id != "all"){
        this.filterTable.nativeElement.value = this.row_id;
        this.applyFilter(this.row_id);
       }
     })
   }

  ngOnInit() {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToMap(elemt: any){
    this._router.navigate(['/carte/' + this.codeInsee + "/" + elemt.row_id]);
  }

  emptyFilter(){
    this.filterInput.setValue('');
    this.applyFilter(this.filterInput.value);
  }

}

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router'; 
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TableauComponent } from './tableau.component';
import { HeaderComponent } from '../header/header.component';


class MockRouter {
  url = "/tableau/75101/all";
  navigate(url: string) { return [url]; };
}


describe('TableauComponent', () => {
  let component: TableauComponent;
  let fixture: ComponentFixture<TableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ TableauComponent, HeaderComponent],
      providers: [
         { provide: Router, useClass: MockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should navigate to Vue Carte', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigate');
    component.codeInsee = "75101";
    component.navigateToMap({row_id:"all"});
    const url = spy.calls.first().args[0][0];
    expect(url).toBe('/carte/75101/all');
  }));
  
});

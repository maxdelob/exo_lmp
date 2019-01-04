import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { HttpRequestsService } from 'src/app/services/httpRequests.service';


class MockRouter {
  url : '/';
  navigate(url: string) { return [url]; }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ HomeComponent ],
      providers: [
        { provide: Router, useClass: MockRouter },
        HttpRequestsService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should navigate to tableau fake all', inject([Router], (router: Router) => {
     const spy = spyOn(router, 'navigate');
    component.navigateFakeData();
    const url = spy.calls.first().args[0][0];
    expect(url).toBe('/tableau/fake/all');
  }))

  it('it should navigate to the selected item', inject([Router], (router: Router)=> {
    const spy = spyOn(router, 'navigate');
    component.arrondissments = [{name: "1er Ardt", libelle: "Louvre", insee: "75101"}];
    component.arrondCtrl.setValue('75101');
    component.onSelectionChanged();
    const url = spy.calls.first().args[0][0];
    expect(url).toBe('/tableau/75101/all');
  }))

});

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router'; 
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonLegendComponent } from './button-legend.component';
import { HttpRequestsService } from 'src/app/services/httpRequests.service';
import { of } from 'rxjs/internal/observable/of';
import { HttpClient } from '@angular/common/http';

describe('ButtonLegendComponent', () => {
  let component: ButtonLegendComponent;
  let fixture: ComponentFixture<ButtonLegendComponent>;
  let httpRequestsService : HttpRequestsService

  class MockRouter {
    url = "/carte/75101/all";
    navigate(url: string) { return [url]; };
  }

  const mokTaille = '["00 - 0 salarié","01 - 1 ou 2 salariés","02 - 3 à 5 salariés","03 - 6 à 9 salariés","11 - 10 à 19 salariés","12 - 20 à 49 salariés","21 - 50 à 99 salariés","22 - 100 à 199 salariés","31 - 200 à 249 salariés","32 - 250 à 499 salariés","41 - 500 à 999 salariés","NN - Unités non employeuses"]';





  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ ButtonLegendComponent],
      providers: [
         { provide: Router, useClass: MockRouter }
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpRequestsService]
    });
    fixture = TestBed.createComponent(ButtonLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpRequestsService = TestBed.get(HttpRequestsService);

  });

  fit('it should', ()=> {
    const spy = spyOn(httpRequestsService, 'getListeTaille').and.returnValue(of(mokTaille))
    // component.ngOnInit();
    // expect(spy).toHaveBeenCalled();   
  })
});

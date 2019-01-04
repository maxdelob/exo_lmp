import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router'; 
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { Feature} from 'geojson';

import { CarteComponent } from './carte.component';
import { HeaderComponent } from '../header/header.component';
import { ButtonLegendComponent } from './button-legend/button-legend.component';

class MockRouter {
  url = "/carte/75101/all";
  navigate(url: string) { return [url]; };
}

let mockRouteActive: any = { snapshot: {}};
mockRouteActive.parent = { params: new Subject<any>()};
mockRouteActive.paramMap = new Subject<any>();
mockRouteActive.paramMap.next({ insee: "75101", row_id: 'all'});

describe('CarteComponent', () => {
  let route: any;
  let component: CarteComponent;
  let fixture: ComponentFixture<CarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ CarteComponent, HeaderComponent, ButtonLegendComponent],
      providers: [
         { provide: Router, useClass: MockRouter },
         { provide: ActivatedRoute, useValue: mockRouteActive }
      ]
    })
    .compileComponents();
  }));

  
  beforeEach(() => {
    fixture = TestBed.createComponent(CarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it('it should create a map', inject([Router], (router: Router, ActivatedRoute: any) => {
    expect(component.map.getBounds()).not.toBeNull();
  }));

  it('it should compute the icon correctly', inject([Router], (router: Router, ActivatedRoute: any) => {
    const data = {} as Feature;
    data.properties = {taille :  "00 - 0 salarié"};
    const test  = component.computeIcon(data);
    expect(test.options.iconUrl).toBe('assets/marker1.svg');
  }));


  
});

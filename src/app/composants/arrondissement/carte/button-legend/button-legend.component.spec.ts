import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { Router } from '@angular/router'; 
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonLegendComponent } from './button-legend.component';
import { HttpRequestsService } from 'src/app/services/httpRequests.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { NavigationService } from 'src/app/services/navigation.service';

describe('ButtonLegendComponent', () => {
  let component: ButtonLegendComponent;
  let fixture: ComponentFixture<ButtonLegendComponent>;

  class MockRouter {
    url = "/carte/75101/all";
    navigate(url: string) { return [url]; };
  }

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
         { provide: Router, useClass: MockRouter }, 
         NavigationService
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

  });

});

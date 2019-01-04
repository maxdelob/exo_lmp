import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router'; 
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header.component';

class MockRouter {
  url : string = "/carte/75101/all";
  navigate(url: string) { return [url]; };
}


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ HeaderComponent],
      providers: [
         { provide: Router, useClass: MockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should navigate to Home', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigate');
    component.retourHome();
    const url = spy.calls.first().args[0][0];
    expect(url).toBe('/');
  }));

  it('it should navigate to Table from Carte', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigate');
    component.toggleNavigation("tableau");
    const url = spy.calls.first().args[0][0];
    expect(url).toBe('/tableau/75101/all');
  }));

  it('it should not navigate to Carte from Carte', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigate');
    component.toggleNavigation("carte");
    const compt = spy.calls.count()    
    expect(compt).toBe(0);
  }));
});

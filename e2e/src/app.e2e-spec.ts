import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import { environment } from './../../src/environments/environment'
import { inject } from '@angular/core/testing';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display display the title', () => {
    page.navigateToHome();
    expect(page.getTitle()).toEqual('Exercice LMP Maxime Delobelle');
  });

  it('should go to the fakeDataPage', () => {
    page.navigateToHome();
    page.getClickFakeDataButton();
    browser.getCurrentUrl().then((url)=> {
      expect(url).toContain('/tableau/fake/all')
    })
  })

  it('From Tableau Page, it should go to the Carte Page on clic in header button', ()=> {
    page.navigateToTableau();
    page.getClickCarteButton();
    browser.getCurrentUrl().then((url)=> {
      expect(url).toContain('/carte/fake/all')
    })
  })

  it('From Carte Page, it should go to the Tableau Page on clic in header button', ()=> {
    page.navigateToCarte();
    page.getClickTableauButton();
    browser.getCurrentUrl().then((url)=> {
      expect(url).toContain('http://localhost:4200/tableau/fake/all')
    })
  })
});

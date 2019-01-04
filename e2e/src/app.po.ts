import { browser, by, element } from 'protractor';


export class AppPage {
  navigateToHome() {
    return browser.get('/');
  }
  navigateToTableau() {
    return browser.get('/tableau/fake/all');
  }

  navigateToCarte() {
    return browser.get('/carte/fake/all');
  }

  getTitle(){
    return element(by.className('titre')).getText();
  }

  getClickFakeDataButton(){
    return element(by.id('bouton-fakeData')).click();
  }

  getClickCarteButton(){
    return element(by.id('bouton-carte')).click();
  }
  getClickTableauButton(){
    return element(by.id('bouton-tableau')).click();
  }  
}

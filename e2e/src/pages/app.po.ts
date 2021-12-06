import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions,
} from "protractor";

export class AppPage {
  titleLogin: ElementFinder;
  enterCallback: ElementFinder;
  searchButton: ElementFinder;
  language: ElementFinder;
  loginButton: ElementFinder;
  constructor() {
    this.titleLogin = element(by.tagName("mat-card-title"));
    this.enterCallback = element(by.xpath('//*[@id="mat-input-2"]'));
    this.language = element(by.xpath('//li/a[contains(text(),"EN")]'));
    this.loginButton = element(by.css('span.mat-button-wrapper'));
    this.searchButton = element(by.xpath('//button[@type="submit"]'));
  }

  async navigateTo() {
    // return browser.get("/login") as Promise<any>;
    await browser.get("http://localhost:4200/");
    browser.driver.manage().window().maximize();
    browser.waitForAngularEnabled(false);
  }
  async loginToApplication() {
    await this.loginButton.click();
  }
  getTitleLogin() {
    return this.titleLogin.getText() as Promise<string>;
  }
  async chooseApplicationLanguage() {
    await this.language.click();
      }
  async enterCallbackURL() {
    await this.enterCallback.sendKeys("12345678");
  }
  async pressSearchButton() {
    const EC = ExpectedConditions;
    const condition = EC.visibilityOf(
      element(by.xpath('//button[@type="submit"]'))
    );
    browser.wait(condition, 10000);
    await this.searchButton.click();
  }
}

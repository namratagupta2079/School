import { Before, Given, Then, When } from "cucumber";
import { expect } from "chai";

import { AppPage } from "../pages/app.po";
import { browser } from "protractor";
import * as nock from "nock";
let page: AppPage;

Before(() => {
  nock("http://127.0.0.1:9999")
    .get("/api/v1/callbackURLs/12345678?page=0&pageSize=10&sort=")
    .reply(200, {
      callbackURLs: [
        {
          callbackURL: "http://localhost:8887/api/v1",
          secret: "secretKey",
          id: 951,
          destinationSystem: "system82",
          isDefault: false,
        },
      ],
      page: 0,
      pageSize: 20,
      totalPages: 1,
      totalElements: 1,
    });
  page = new AppPage();
});

Given(/^I am on the login page$/, async () => {
  await page.navigateTo();
});

When(/^I do nothing$/, () => {});

Then(/^I should see the title$/, async () => {
  expect(await page.getTitleLogin()).to.equal("Login");
});
Then("press login button", async () => {
  await page.loginToApplication();
  browser.sleep(5000);
});

Then("choose language EN", async () => {
  await page.chooseApplicationLanguage();
  browser.sleep(5000);
});
Then("access to Search for CallbackURL", async () => {
  await page.enterCallbackURL();
  browser.sleep(5000);
});
Then("press search button", async () => {
  await page.pressSearchButton();
});

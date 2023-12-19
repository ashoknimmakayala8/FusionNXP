const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("chai").assert;
const { loginForm } = require("../../forms");
const credentials = require("../../../configs/environment/credentials");



/**
 * user is on login page
 */
Given(/^user is on login page$/, async () => {
  
  return assert.isTrue(await loginForm.waitForFormIsOpened(), `Form '${loginForm.getFormName()}' is not opened`);
});

/**
 * user logs in with 'user 1' credentials
 */
When(/^user logs in with '(.*)' credentials$/, async (user) => {

  await loginForm.enterEmailAddress(credentials[user].email);
  await loginForm.clickContinueButton();
  await browser.pause(4000);
  await loginForm.enterPassword(credentials[user].password);
  return loginForm.clickLoginButton();
  
});



Then(/^Clicks on Org_Analyst as a Work Role$/, async () => {
	await loginForm.clickdropdownbutton();
  await browser.pause(4000);
});



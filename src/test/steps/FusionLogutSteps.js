const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("chai").assert;
const { LogoutForm, loginForm } = require("../../forms");

/**
 * overview page is displayed
 */
Then(/^Logout Button is displayed$/, async () => {
  return assert.isTrue(await LogoutForm.waitForFormIsOpened(), `Form '${LogoutForm.getFormName()}' is not opened`);
});


Then(/^user clicks on logout button$/, async () => {
	return LogoutForm.ClicklogoutButton();
});





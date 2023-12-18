const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("chai").assert;
const { FusionForm } = require("../../forms");


Then(/^Fusion page is displayed$/, async () => {
  return assert.isTrue(await FusionForm.waitForFormIsOpened(), `Form '${FusionForm.getFormName()}' is not opened`);
});


When(/^user clicks on Profile Icon$/, async () => {
  await FusionForm.profileIcon();
});


Then(/^9 dots is displayed$/, async () => {
	return assert.isTrue(await FusionForm.Ninedots(), `Fusion 9 Dots is displayed`);
});

When(/^user clicks on 9 dots$/, async () => {
	await FusionForm.clickNinedots();

});

//////////////////////////////////////NewPlan////////////////////////////////////

Then(/^New Plan is displayed$/, async () => {
	await FusionForm.isdisplayednewplan();
});

When(/^user clicks on New Plan$/, async () => {
	await FusionForm.clicknewplan();
});


Then(/^New Plan page is displayed$/, async () => {
	await FusionForm.isdisplayednewplanpage();
});

Then(/^user enters Name$/, async () => {
	await FusionForm.newplanNamefield();
	await browser.pause(3000);
});



Then(/^user selects Plan Type$/, async () => {
	await FusionForm.selectplantypevalue();
	await browser.pause(3000);	
});



///////////////////////TM////////////////////////////////////////////////////



Then(/^Task Management is displayed$/, async () => {
	await FusionForm.isdisplayedtaskmanagement();

});

When(/^user clicks on Task Management$/, async () => {
	await FusionForm.taskManagement().click();
});


Then(/^Key Insights is displayed$/, async () => {
	await FusionForm.isdisplayedtmkeyInsights();
});


Then(/^continue button is displayed$/, async () => {
	await FusionForm.isdisplayedtmcontinuebutton();
});

When(/^user clicks on continue button$/, async () => {
	await FusionForm.clicktmcontinuebutton();
});

Then(/^comment Icon is displayed$/, async () => {
	await FusionForm.isdisplayedtmcommenticon();
  
});


Then(/^PROFILE button is displayed$/, async () => {
	await FusionForm.isdisplayedtmprofilebutton();
});


Then(/^user clicks on organization dropdown$/, async () => {
	await FusionForm.clicktmorgdropdown();
});




When(/^user clicks on comment Icon$/, async () => {
	await FusionForm.clicktmcommenticon();
  
});


Then(/^user enter comment on comment section$/, async () => {
	await FusionForm.entercomment();
});


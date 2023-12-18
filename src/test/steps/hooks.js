// const gmailCredentials = require("../../../configs/environment/gmailApiConfig");
// const auth0Config = require("../../../configs/environment/auth0ApiConfig");
// const sfApiConfig = require("../../../configs/environment/sfApiConfig");
// const { GmailSsoUtil, Auth0ApiUtil, SFApiUtil } = require("../../utils");
// const { Before, After } = require("@cucumber/cucumber");

// Before({ tags: "@prepare_gmail_gmail_user_1 or @prepare_gmail_gmail_user_2" }, async function (scenario) {
//   const tags = scenario.pickle.tags.find((tag) => tag.name.startsWith("@prepare_gmail_")).name;
//   const user = tags.match(/prepare_gmail_(.*)/)[1];
//   global.gmail = new GmailSsoUtil(gmailCredentials[user]);
// });

// Before({ tags: "@remove_all_emails" }, async function () {
//   await global.gmail.moveAllMessagesToTrash();
// });

// Before({ tags: "@prepare_auth0" }, async function () {
//   global.auth0TokenApi = new Auth0ApiUtil(auth0Config.BASE_URL, {
//     "Content-Type": "application/x-www-form-urlencoded",
//   });
//   const token = await global.auth0TokenApi.getManagementAPIToken();
//   global.auth0Api = new Auth0ApiUtil(auth0Config["access token"].BASE_URL, {
//     Authorization: `Bearer ${token}`
//   });
// });

// Before({ tags: "@prepare_sf" }, async function () {
//   global.sfBearerTokenApi = new SFApiUtil(sfApiConfig.BASE_URL);
//   const token = await global.sfBearerTokenApi.getSFBearerToken();
//   global.sfApi = new SFApiUtil(sfApiConfig.BASE_URL, {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   });
// });

// After({ tags: "@delete_user" }, async function () {
//   let signupUser = global.signupUser.replace("+", "%2B");
//   let userId = (await global.auth0Api.getUser(signupUser)).data[0].user_id;
//   await global.auth0Api.deleteUser(userId);
// });

// After({ tags: "@get_entitlements" }, async function () {
//   let appMetadataChangedValue = JSON.parse(JSON.stringify(this.auth0Metadata.app_metadata));
//   appMetadataChangedValue.entitlements.salesForceEntitlements.needSalesForceRefresh = true;
//   await global.auth0Api.updateUser(this.auth0Metadata.user_id, {
//     app_metadata: appMetadataChangedValue,
//   });
//   await global.auth0Api.getTokensWithScopes(this.auth0MetadataUser, "");
// });

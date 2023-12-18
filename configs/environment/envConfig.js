const env = process.env.ENVIRONMENT || "qa";
const browser = process.env.BROWSER || "chrome";

module.exports = {
  env: env,
  url: getURL(env),
  sampleAppUrl: getSampleAppUrl(env),
  browserName: browser,
};

/**
 * Get Website URL depending on the environment
 * @param {string} env environment
 * @returns {string} Webstie URL
 */
function getURL(env) {
  switch (env) {
    case "dev":
      return "https://fusprtl-webui.dev.fusion.norstella-labs.com/";
    case "test":
      return "https://fusprtl-webui.qa.fusion.norstella-labs.com/";
    case "uat":
      return "https://fusprtl-webui.qa.fusion.norstella-labs.com/";
    default:
      return "https://fusprtl-webui.qa.fusion.norstella-labs.com/";
  }
}

/**
 * Get NXP SSO sample app URL depending on the environment
 * @param {string} env environment
 * @returns {string} Webstie URL
 */
function getSampleAppUrl(env) {
  switch (env) {
    case "dev":
      return "https://sso-sample.dev.nxp.norstella-labs.com/";
    case "test":
      return "https://sso-sample.test.nxp.norstella-labs.com/";
    case "uat":
      return "https://sso-sample.uat.nxp.norstella-labs.com/";
    default:
      return "https://sso-sample.uat.nxp.norstella-labs.com/";
  }
}

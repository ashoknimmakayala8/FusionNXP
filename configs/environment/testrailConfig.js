require('dotenv').config();

const testrailConfig = {
  baseUrl: process.env.TR_BASE_URL || "https://citeline.testrail.io//index.php?/api/v2/",
  email: process.env.TR_LOGIN || "",
  token: process.env.TR_TOKEN || "",
  scenarioExportCheck: Boolean(Number(process.env.TR_SCENARIO_EXPORT || "0")),
  resultsExportCheck: Boolean(Number(process.env.TR_RESULTS_EXPORT || "0")),
  projectId: process.env.TR_PROJECT_ID,
  milestoneId: process.env.TR_MILESTONE_ID || "",
  suiteId: process.env.TR_SUITE_ID,
};

module.exports = { testrailConfig };

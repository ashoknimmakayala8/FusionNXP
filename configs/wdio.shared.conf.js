const wdioParallel = require("wdio-cucumber-parallel-execution");
const fs = require("fs");
const reporter = require("cucumber-html-reporter");
const moment = require("moment");
const { removeSync } = require("fs-extra");
const { type } = require("os");
const timeouts = require("./environment/timeouts");
const { env, browserName, url } = require("./environment/envConfig");
const { Status } = require("@cucumber/cucumber");
const Logger = require("@informa/automation-framework").Logger;
const setupBrowser = require("@informa/automation-framework").browserActions;
const { SCREEN_HEIGHT, SCREEN_WIDTH } = require("./environment/screenSizes");

const { testrailConfig } = require("./environment/testrailConfig");
const { TestrailApi } = require("@informa/automation-framework/src/framework/utils/testrailUtils/testrailApi");
const { testrailStatus } = require("@informa/automation-framework/src/framework/utils/testrailUtils/testrailStatus");

const runnerUtil = require("../src/utils/runnerUtil")

const reportsDirectory = "reports";
const jsonReportDirectory = "reports/json/";
const htmlReportDirectory = "reports/html/";
const screenshotsDirectory = "reports/screenshots/";
const tempDirectory = "temp/";

const testrailApi = new TestrailApi();

exports.config = {
  runner: "local",
  specs: ["./src/test/features/**/*.feature"],
  exclude: [],
  maxInstances: 1,
  logLevel: "warn",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: timeouts.explicit,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "cucumber",
  reporters: [
    "spec",
    [
      "cucumberjs-json",
      {
        jsonFolder: jsonReportDirectory,
        language: "en",
      },
    ],
  ],
  cucumberOpts: {
    require: ["./src/test/steps/**/*.js"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    format: ["pretty"],
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    tagExpression: "@automated",
    timeout: timeouts.cucumberStep,
    ignoreUndefinedDefinitions: false,
  },

  onPrepare: async () => {
    runnerUtil.createReportDirs(reportsDirectory, jsonReportDirectory,
       screenshotsDirectory, tempDirectory, htmlReportDirectory)

    if (testrailConfig.resultsExportCheck) {
      await runnerUtil.getOrCreateMilestone(this, testrailApi)

      await runnerUtil.getOrCreateTestPlan(this, testrailApi)

      Logger.info(`Using PlanId '${this.planId}' for milestone '${this.milestoneId}'`);
      
      const date = moment().format("DD_MM_YY");
      await runnerUtil.createPlanEntry(this, testrailApi, 
        `AUTOTESTS_RUN_${env}_${browserName}_${date}`, tempDirectory)

      Logger.info(`Created testrail entry run with id '${this.testRunId}' for plan ${this.planId}`);
    }
  },

  beforeScenario: async function (testCase) {
    Logger.info(`Run test "${testCase.pickle.name}"`);
    await setupBrowser();
    Logger.info(`Session id: ${browser.sessionId}`);
    await browser.reloadSession();
    await browser.setTimeout({
      implicit: timeouts.implicit,
      pageLoad: timeouts.pageLoadTime,
    });
    await browser.setWindowSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    await browser.url(url);
    if (testrailConfig.resultsExportCheck) {
      this.stepsResult = [];
      this.runId = Number(fs.readFileSync(`${tempDirectory}/testRunId.txt`, "utf8"));
      this.startTime = moment().utc();
    }
  },

  afterStep: async function (step, scenario, result) {
    if (testrailConfig.resultsExportCheck) {
      if (result["passed"]) {
        this.stepsResult.push({
          content: step["keyword"] + step["text"],
          status_id: testrailStatus.PASSED,
        });
      } else {
        this.stepsResult.push({
          content: step["keyword"] + step["text"],
          status_id: testrailStatus.FAILED,
          actual: result["error"],
        });
      }
      //Logger.info(`StepsResult: ${JSON.stringify(this.stepsResult)}`);
    }
  },

  afterScenario: async function (testCase) {
    if (testCase.result.status === Status.FAILED) {
      this.path = await runnerUtil.takeScreenshot(testCase);
    }

    
    if (testrailConfig.scenarioExportCheck) {
      await runnerUtil.exportScenarioToTestRail(testCase, testrailApi);
    }

    if (testrailConfig.resultsExportCheck) {
      await runnerUtil.exportResultToTestRail(this, testCase, testrailApi);
    }
  },

  onComplete: async () => {
    try {
      const consolidatedJsonArray = wdioParallel.getConsolidatedData({
        parallelExecutionReportDirectory: jsonReportDirectory,
      });

      const jsonFile = `${jsonReportDirectory}report.json`;
      fs.writeFileSync(jsonFile, JSON.stringify(consolidatedJsonArray));

      const date = moment().format("DD_MM_YY");

      const options = {
        theme: "bootstrap",
        jsonDir: jsonReportDirectory,
        output: `reports/html/nxp_sso_${env}_${browserName}_${date}.html`,
        name: "NXP SSO automation",
        brandTitle: "NXP SSO Automation",
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: false,
        ignoreBadJsonFile: true,
        metadata: {
          "App Version": "0.0.1",
          "Test Environment": `${env}`,
          Platform: `${type()}`,
          Parallel: "Scenarios",
          Browser: `${browserName}`,
          Executed: "Remote",
        },
      };

      reporter.generate(options);
      removeSync(tempDirectory);
    } catch (err) {
      console.log("err", err);
    }
  },
};

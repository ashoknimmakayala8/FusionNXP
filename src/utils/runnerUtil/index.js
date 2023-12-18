const fs = require("fs");
const { removeSync } = require("fs-extra");
const { testrailConfig } = require("../../../configs/environment/testrailConfig");
const { TestrailApi } = require("@informa/automation-framework/src/framework/utils/testrailUtils/testrailApi");
const moment = require("moment");
const Logger = require("@informa/automation-framework").Logger;
const BddUtil = require("@informa/automation-framework/src/framework/utils/testrailApi/bddUtil");
const { testType } = require("@informa/automation-framework/src/framework/utils/testrailUtils/testType");
const { testPriority } = require("@informa/automation-framework/src/framework/utils/testrailUtils/testPriority");
const cucumberJson = require("wdio-cucumberjs-json-reporter").default;
const { testrailStatus } = require("@informa/automation-framework/src/framework/utils/testrailUtils/testrailStatus");
const { Status } = require("@cucumber/cucumber");
const FormData = require("form-data");

function createReportDirs(reportsDirectory, jsonReportDirectory,
                          screenshotsDirectory, tempDirectory,
                          htmlReportDirectory,
                          ){
    if (!fs.existsSync(reportsDirectory)) {
        fs.mkdirSync(reportsDirectory);
      }
      if (fs.existsSync(jsonReportDirectory)) {
        removeSync(jsonReportDirectory);
        fs.mkdirSync(jsonReportDirectory);
      } else {
        fs.mkdirSync(jsonReportDirectory);
      }
      if (fs.existsSync(screenshotsDirectory)) {
        removeSync(screenshotsDirectory);
        fs.mkdirSync(screenshotsDirectory);
      } else {
        fs.mkdirSync(screenshotsDirectory);
      }
      if (!fs.existsSync(tempDirectory)) {
        fs.mkdirSync(tempDirectory);
      }
      if (!fs.existsSync(htmlReportDirectory)) {
        fs.mkdirSync(htmlReportDirectory);
      }
}

async function takeScreenshot(testCase){
  try {
    const name = `${testCase.pickle.name.replace(/[^a-zA-Z ]/g, "")}_${new Date().getTime()}.png`;
    const screen = await browser.takeScreenshot();
    path = `./reports/screenshots/${name}`;
    fs.writeFileSync(path, screen, "base64", (err) => {
      Logger.error(err);
    })
    cucumberJson.attach(screen, "image/png");
    return path;
  } catch (err) {
    Logger.error(err);
  }
}
async function getOrCreateMilestone(wdioConfig, testrailApi){
  if (testrailConfig.milestoneId !== "") {
    wdioConfig.milestoneId = testrailConfig.milestoneId;
  } else {
    const milestones = await testrailApi.getMilestones(testrailConfig.projectId);
    const filteredMilestones = milestones.data.milestones.filter(
      (milestone) =>
        (milestone.is_started === true) &
        (milestone.is_completed === false) &
        (milestone.name === `Milestone_${moment().format("MM_YY")}`),
    );

    if (filteredMilestones.length === 0) {
      const currentDate = new Date();
      const dueDate = new Date(currentDate);
      dueDate.setMonth(dueDate.getMonth() + 1);
      const currentDateTimestamp = Math.floor(currentDate.getTime() / 1000);
      const dueDateTimestamp = Math.floor(dueDate.getTime() / 1000);

      const newMilestoneResponse = await testrailApi.addNewMilestone(testrailConfig.projectId, {
        name: `Milestone_${moment().format("MM_YY")}`,
        start_on: currentDateTimestamp,
        due_on: dueDateTimestamp,
      });``
      wdioConfig.milestoneId = newMilestoneResponse.data.id;
      await testrailApi.updateMilestone(wdioConfig.milestoneId, {
        is_started: true,
      });
    } else {
      wdioConfig.milestoneId = filteredMilestones[0].id;
    }
  }
  console.log(`Milestone ${wdioConfig.milestoneId} will be used for export...`)
}

async function getOrCreateTestPlan(wdioConfig, testrailApi){
  const date = moment().format("DD_MM_YY");
  let plans = await testrailApi.getPlans(testrailConfig.projectId);
  const filteredPlans = plans.data.plans.filter(
    (plan) => (plan.milestone_id === wdioConfig.milestoneId) & plan.name.startsWith("AUTOTESTS_PLAN"),
  );

  if (filteredPlans.length === 0) {
    const newPlan = await testrailApi.addNewPlan(testrailConfig.projectId, {
      name: `AUTOTESTS_PLAN_${wdioConfig.milestoneId}_MILESTONE`,
      milestone_id: wdioConfig.milestoneId,
    });
    wdioConfig.planId = newPlan.data.id;
    Logger.info(`Created testrail plan with id '${wdioConfig.planId}' for milestone '${wdioConfig.milestoneId}'`);
  } else {
    wdioConfig.planId = filteredPlans[0].id;
    Logger.info(`Received existing testrail plan with id '${wdioConfig.planId}' for milestone '${wdioConfig.milestoneId}'`);
  }
}

async function createPlanEntry(wdioConfig, testrailApi, entryName, tempDirectory){
  const newPlanEntry = await testrailApi.addNewPlanEntry(wdioConfig.planId, {
    suite_id: testrailConfig.suiteId,
    name: entryName,
    include_all: true,
  });

  wdioConfig.testRunId = newPlanEntry.data.runs[0].id;
  fs.writeFileSync(`${tempDirectory}testRunId.txt`, String(wdioConfig.testRunId), (err) => {
    Logger.error(err);
  });
}

async function exportScenarioToTestRail(testCase, testrailApi){
  const sectionId = BddUtil.getSectionIdFromTag(testCase);
  const stepsSeparatedDescription = BddUtil.getSeparatedStepsFromScenario(testCase);
  let newTestCaseBody = {
    title: testCase.pickle.name,
    type_id: testType.AUTOMATED,
    template_id: 2,
    custom_automation_type: testType.AUTOMATED,
    custom_steps_separated: stepsSeparatedDescription,
  };
  if (BddUtil.checkTag(testCase, "@smoke")) {
    newTestCaseBody.priority_id = testPriority.CRITICAL;
    await testrailApi.addNewTestCase(sectionId, newTestCaseBody);
  } else if (BddUtil.checkTag(testCase, "@MAT")) {
    newTestCaseBody.priority_id = testPriority.HIGH;
    await testrailApi.addNewTestCase(sectionId, newTestCaseBody);
  } else if (BddUtil.checkTag(testCase, "@AT")) {
    newTestCaseBody.priority_id = testPriority.MEDIUM;
    await testrailApi.addNewTestCase(sectionId, newTestCaseBody);
  } else {
    newTestCaseBody.priority_id = testPriority.MEDIUM;
    await testrailApi.addNewTestCase(sectionId, newTestCaseBody);
  }
}

async function exportResultToTestRail(wdioConfig, testCase, testrailApi){
  attachmentTestrailApi = new TestrailApi({
    "Content-Type": "multipart/form-data",
  });
  try {
    wdioConfig.endTime = moment().utc();
    const duration = moment.duration(wdioConfig.endTime.diff(wdioConfig.startTime));
    const elapsed = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;

    const caseId = BddUtil.getCaseIdFromScenarioName(testCase);
    const defectId = BddUtil.getDefectIdFromTag(testCase);

    if (BddUtil.checkTag(testCase, "@skip")) {
      await testrailApi.addResultForCase(wdioConfig.runId, caseId, {
        status_id: testrailStatus.BLOCKED,
        comment: "This test case is marked as skipped",
        defects: defectId,
      });
    } else if (testCase.result.status === Status.FAILED) {
      const newResult = await testrailApi.addResultForCase(wdioConfig.runId, caseId, {
        status_id: testrailStatus.FAILED,
        defects: defectId,
        elapsed: elapsed !== "0h 0m 0s" ? elapsed : "0h 0m 1s",
        custom_step_results: wdioConfig.stepsResult,
      });
      const testResultId = newResult.data.id;

      const formDataBody = new FormData();
      formDataBody.append("attachment", fs.createReadStream(wdioConfig.path));
      await attachmentTestrailApi.addAttachmentToResult(testResultId, formDataBody);
    } else {
      await testrailApi.addResultForCase(wdioConfig.runId, caseId, {
        status_id: testrailStatus.PASSED,
        elapsed: elapsed !== "0h 0m 0s" ? elapsed : "0h 0m 1s",
        custom_step_results: wdioConfig.stepsResult,
      });
    }
  } catch (err) {
    console.log(`Unable to upload results: ${err}`);
  }
}


module.exports = {
    createReportDirs,
    getOrCreateMilestone,
    getOrCreateTestPlan,
    createPlanEntry,
    exportScenarioToTestRail,
    exportResultToTestRail,
    takeScreenshot,
}
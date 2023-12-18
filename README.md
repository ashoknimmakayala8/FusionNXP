# NXP-SSO Automation solution

## Required software

- **[NodeJS](https://nodejs.org/en/)**
- **[GIT](https://git-scm.com/downloads)**

## Project structure

|Directory|Description|
|--|--|
|/configs/environment/|Configuration for the project. Timeouts, credentials, URLs, etc.|
|/configs/|Browser configurations|
|/reports/html/|Here you can find the HTML report generated after the run was finished|
|/src/forms/|Forms that represent the pages or their parts in the application. All the interaction with pages is stored and performed in there|
|/src/test/features/|Feature files with scenarios written in the Gherkin language|
|/src/test/steps/|Code base for the steps that are used in the scenario execution|
|/src/utils/|Utils that are needed for the project (Api, Database connection etc.)|

## Setup

 1. Make sure you have access to a private repository -  **[@informa/automation-framework](https://github.com/informa-pharma/informa_framework)**
 2. Replace the  **tokenplaceholder**  in the  **.npmrc**  file with the provided npm read-only token.
 3. Run  **npm install**  command to install all the dependencies.

## Scripts

Scripts can be found in the `package.json` file in the root directory of the project.
Here are short descriptions for them:
|Script|Description|
|--|--|
|test:chrome|Run the Gherkin scenarios using the Chrome browser|
|test:edge|Run the Gherkin scenarios using the Edge browser|
|test:firefox|Run the Gherkin scenarios using the Firefox browser|
|lint|Check the whole project with ESLint|
|lint:fix|Fix all the issues in the project that were found with ESLint|

## Debugging

To debug a test go to the `package.json` and edit the `--cucumberOpts.tagExpression` option in the script that you need to match the tag set on the scenario that needs to be debugged.
You can also remove the `--headless` launch option in the `/configs/wdio.<browser_name>.conf.js` file to see what's going on on the website during test execution.
Then just run the solution using the `npm run <script_name>` command in the terminal.

##Formatting 

Install official Rome VS Code extension to be able to see hints from Rome about code style. To make Rome the default formatter:

1. open the Command Palette (View or Command/Ctrl + Shift + P)
2. select Format Document With…
3. select Configure Default Formatter
4. select Rome.

In project `rome.json` file is added to apply the same rules for all project.

## Pull Request Creation

Pull requests should comply the certain format. That format is stored in the `/.github/pull_request_template.md` file. Please follow the accepted format when you create a pull request.

const Element = require("@informa/automation-framework").Element;
const BaseForm = require("@informa/automation-framework").BaseForm;

class LoginForm extends BaseForm {
  constructor() {
    super("//h1[contains(text(),'Welcome to')]", "Welcome form");
  }

 
  emailInputField = () => new Element('//input[@id="username"]', "Email input field");


  /**
   * user inputs 'email' in email field
   * @returns {Promise<void>} result
   */
  async enterEmailAddress(email) {
    return this.emailInputField().type(email);
  }

  continueButton = () => new Element('//button[@type="submit"]', "Continue button");

  /**
   * Click on continue button
   * @returns {Promise<void>} result
   */
  async clickContinueButton() {
    return this.continueButton().click();
  }

  password = () => new Element(`//input[@id='password']`, "password field");

  /**
   * user inputs 'password' in password field
   * @returns {Promise<void>} result
   */
  async enterPassword(password) {
    return this.password().type(password);
  }

  loginButton = () => new Element("//button[contains(@class,'button-login-password')]", "login button");

  /**
   * user clicks the Login button
   * @returns {Promise<void>} result
   */
  async clickLoginButton() {
    return this.loginButton().click();
  }

  dropdownbutton = () => new Element('//button[@title="Open"]', "Dropdown Button");
  typerole = () => new Element('//input[@placeholder="Select Role"]', "Type Role");
  selectrole = () => new Element('//div[@data-popper-placement="bottom"]', "Select Role");

  async clickdropdownbutton() {
    await this.dropdownbutton().click();
    await this.typerole().type('Org_Analyst');
    return this.selectrole().click();
  }



}

module.exports = new LoginForm();

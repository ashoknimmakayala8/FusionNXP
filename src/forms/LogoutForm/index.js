const Element = require("@informa/automation-framework").Element;
const BaseForm = require("@informa/automation-framework").BaseForm;

class LogoutForm extends BaseForm {
  constructor() {
    super("//p[text()='Logout']", "Logout Form");
  }

  logoutButton = () => new Element(`//p[text()='Logout']`, "Logout Button");

  async ClicklogoutButton() {
    return this.logoutButton().click();
  }


}

module.exports = new LogoutForm();

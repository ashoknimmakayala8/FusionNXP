const Element = require("@informa/automation-framework").Element;
const BaseForm = require("@informa/automation-framework").BaseForm;

class Fusionform extends BaseForm {
  constructor() {
    super("//a[text()='Fusion']", "Fusion Form");
  }

  profileiconbutton = () => new Element(`//img[@class='MuiAvatar-img css-1pqm26d-MuiAvatar-img']`, "Profile Icon");

  async profileIcon() {
    return this.profileiconbutton ().click();
  }

  ninedotsbutton = () => new Element(`//button[@type='button']`, "Nine Dots");


  async Ninedots() {
    return this.ninedotsbutton().state().isDisplayed();
  }

  async clickNinedots() {
    return this.ninedotsbutton().click();
  }


  ///////////////////////////Newplan///////////////////////////////////////////

  Newplan = () => new Element(`//span[text()='New Plan']`, "New Plan");

  async isdisplayednewplan() {
    return this.Newplan().state().isDisplayed();
  }

  async clicknewplan() {
    return this.Newplan().click();
  }

  newplanpage = () => new Element(`//div[text()='New Plan']`, "New Plan Page");

  async isdisplayednewplanpage() {
    return this.newplanpage().state().isDisplayed();
  }

  newplanName = () => new Element(`//input[@id='nxp-textinput']`, "New Plan Name Field");

  async newplanNamefield() {
    return this.newplanName().type('Aetna');
  }

  Plantypedropdown = () => new Element(`//input[@placeholder='Plan Type']`, "Plan Type");


async clickplantypedropdown() {
    return this.Plantypedropdown().click();
  }

  Plantypevalue = () => new Element(`//input[@aria-activedescendant="nxp-autocomplete-option-4"]`, "Plan Type Value");

  async clickplantypevalue() {
    return this.Plantypevalue().click();
  }

  Plantypecontainer = () => new Element(`//label[text()='Plan Type']/parent::div/following-sibling::div`, "Plan Type Container");

  Plantypesearch = () => new Element(`//input[@placeholder='Select']`, "Plan Type Search");

  selectplantype = () => new Element(`//div[@data-popper-placement='bottom']`, "Select Plan Type");

  async selectplantypevalue() {
    
    await this.Plantypecontainer().click();
    await this.Plantypesearch().type('CHIP');
    return this.selectplantype().click();
  }  

  ///////////////////////////TM/////////////////////////////////////////////////////


  taskManagement = () => new Element(`//span[text()='Task Management']`, "Task Management");

  async isdisplayedtaskmanagement() {
    return this.taskManagement().state().isDisplayed();
  }


  async clicktaskmanagement() {
    return this.taskManagement().click();
  }


  TMcontinue = () => new Element(`//div[text()='Continue']`, "Task Management Continue Button");

  async isdisplayedtmcontinuebutton() {
    return this.TMcontinue().state().isDisplayed();
  }

  async clicktmcontinuebutton() {
    return this.TMcontinue().click();
  }

  TMcommentIcon = () => new Element(`//div[@id='kebabIcon']/div/img`, "Comment Icon");

  async isdisplayedtmcommenticon() {
    return this.TMcommentIcon().state().isDisplayed();
  }

  async clicktmcommenticon() {
    return this.TMcommentIcon().click();
  }

  TMPROFILEbutton = () => new Element(`//button[text()='PROFILE']`, "TM Profile Button");

  async isdisplayedtmprofilebutton() {
    return this.TMPROFILEbutton().state().isDisplayed();
  }

  TMorgdropdown = () => new Element(`//label[text()='Organisation']/parent::div/div/div`, "TM Org dropdown");


  async clicktmorgdropdown() {
    return this.TMorgdropdown().click();
  }

  TMcommentsection = () => new Element(`//div[@id='commentIcon']`, "Comment Icon");

  async entercomment() {
    return this.TMcommentsection().addValue('GSK');
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////


    



  




  






  /**
   * Is navigation tab displayed
   * @returns {Promise<boolean>} result
   */
  async isNavigationTabDisplayed(tabText) {
    return this.navigationTab(tabText).state().isDisplayed();
  }
  
  
 
  /**
   * Open Filter Button button is visible
   * @returns {Promise<boolean>} result
   */
  async isFilterButtonDisplayed() {
    return this.filterExpandButton().state().isDisplayed();
  }
}

module.exports = new Fusionform();

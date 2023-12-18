

Feature: Fusion Login Page

  Background: Open the login page
    Given user is on login page
    When user logs in with 'user 1' credentials
    Then Clicks on Org_Analyst as a Work Role
    Then Fusion page is displayed


  
  Scenario: Verify Fusion Home page can be opened and can comment in TM
    Given Fusion page is displayed
    Then 9 dots is displayed
    When user clicks on 9 dots
    Then Task Management is displayed
    When user clicks on Task Management
    Then Key Insights is displayed
    Then continue button is displayed
    When user clicks on continue button
    Then comment Icon is displayed
    Then PROFILE button is displayed
    Then user clicks on organization dropdown
    
    
    
    



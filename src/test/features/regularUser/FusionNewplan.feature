
Feature: Fusion Login Page

  Background: Open the login page
    Given user is on login page
    When user logs in with 'user 1' credentials
    Then Clicks on Org_Analyst as a Work Role
    Then Fusion page is displayed




  Scenario: Verify Fusion Home page is opened and can make changes in New Plan
    Given Fusion page is displayed
    Then 9 dots is displayed
    When user clicks on 9 dots
    Then New Plan is displayed
    When user clicks on New Plan
    Then New Plan page is displayed
    Then user enters Name
    Then user selects Plan Type
    
    
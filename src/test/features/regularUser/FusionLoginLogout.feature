@Fusion @automated 
Feature: Fusion Login Page

  Background: Open the login page
    Given user is on login page
    When user logs in with 'user 1' credentials
    Then Clicks on Org_Analyst as a Work Role
    Then Fusion page is displayed

  @Fusion 
  Scenario: Verify Fusion Home page can be opened and Logout
    Given Fusion page is displayed
    When user clicks on Profile Icon
    Then Logout Button is displayed
    Then user clicks on logout button
    

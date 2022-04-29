Feature: Registering a new user

Scenario: The user is not registered in the site
  Given An unregistered user
  When I fill the data in the form and press sign up
  Then A confirmation message should be shown in the screen

Scenario: The user is already registered in the site
  Given A registered user
  When I fill the data in the form and press sign up
  Then An error message should be shown in the screen

Scenario: The user tries to go to login page via link
  When I click the go to login button
  Then Login page should be displayed
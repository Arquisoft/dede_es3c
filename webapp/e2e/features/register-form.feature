Feature: Registering a new user

Scenario: The user can Logout 
  Given An unregistered user
  When I fill the data in the form and press sign up
  Then A confirmation message should be shown in the screen

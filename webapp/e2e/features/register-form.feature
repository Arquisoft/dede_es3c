Feature: Registering a new user

Scenario: The user can Logout 
  Given Nothing
  When I fill the data in the form and press sign up
  Then A confirmation message should be shown in the screen
Scenario: Register user on the website
  Given A registered user
  When I fill the data in the form and press sign up
  Then A confirmation message should be shown in the screen

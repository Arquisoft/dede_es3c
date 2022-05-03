Feature: Login out a loged user

Scenario: The user is loged in the site and click to logout
    Given An existing user
    When Click de logout button once logged
    Then User is redirected to login page
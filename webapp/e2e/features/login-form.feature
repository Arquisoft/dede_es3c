Feature: Login a user

Scenario: An existing user tries to log in the app
    Given An existing user
    When Fill the form and click log in button
    Then Welcome message is shown and is redirected to catalog page

Scenario: Non existing user tries to log in the app
    Given A non existing user
    When Fill the form and click log in
    Then Error message should be displayed

Scenario: Existing user tries to login without filling name
    Given An existing password
    When Fill password field and click log in button
    Then Error mesage should be displayed

Scenario: Existing user tries to login without filling password
    Given An existing username
    When Fill username field and click log in button
    Then Error message should be displayed

Scenario: User tries to go to sign up page via link
    When User clicks in go to register link
    Then Signup page should be displayed
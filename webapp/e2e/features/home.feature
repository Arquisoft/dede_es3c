Feature: User tries to use home links

Scenario: User tries to go to catalog
    When User clicks on go to catalog link at home
    Then Catalog page is displayed

Scenario: User tries to go to sign up
    When User clicks on go to sign up link at home
    Then Sign up page is displayed

Scenario: User tries to go to about us
    When User clicks on go to about link at home
    Then About us page is displayed
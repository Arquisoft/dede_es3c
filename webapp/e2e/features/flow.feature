Feature: Try to reach all pages via header

Scenario: Logged client user is at catalog page and tries to go to home
    Given A valid client user
    When User clicks in home header option
    Then User goes to home page

Scenario: Logged client user is at home and tries to go to catalog
    When User clicks in catalog header option
    Then User goes to catalog page
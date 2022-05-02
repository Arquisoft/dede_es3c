Featue: Try to reach all pages via header

Scenario: Logged client user is at catalog page and tries to go to home
    Given A valid client user
    When User clicks in home header option
    Then User goes to home page

Scenario: Logged client user is at home and tries to go to catalog
    When User clicks in catalog header option
    Then User goes to catalog page

Scenario: Logged client user is at catalog page and tries to go to my orders page
    When User clicks in my orders header option
    Then User goes to catalog my orders page

Scenario: Logged client user is at my orders page and tries to go to my account page
    When User clicks in my account header option
    Then User goes to my account page

Scenario: Logged admin user is at home and tries to go to add product page
    Given A valid admin user
    When User clicks in add product header option
    Then User goes to add product page

Scenario: Logged admin user is at add product and tries to go to edit product page
    When User clicks in edit product header option
    Then User goes to edit product page

Scenario: Logged admin user is at edit product and tries to go to delete product page
    When User clicks in delete product header option
    Then User goes to delete product page

Scenario: Logged admin user is at delete product and tries to go to users page
    When User clicks in users header option
    Then User goes to delete users page
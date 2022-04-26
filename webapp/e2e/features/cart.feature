Feature: users tries to add and remove products from cart

Scenario: User opens cart
    Given A registered client user
    When Clicks on cart button
    Then Cart is displayed

Scenario: User tries to add to cart an item from catalog
    When User selects and amount of a product and clicks in add to cart button
    Then Item is added to cart

Scenario: User tries to add more of an item in cart from catalog
    When User selects and amount of a product and clicks in add to cart button
    Then Item is added to cart

Scenario: User tries to add more of an item in cart from catalog but there isn't enough stock
    When User selects and amount of a product and clicks in add to cart button
    Then An error message is displayed

Scenario: User tries to add a unit of a product in cart from cart but there isn't enough stock
    When User clicks on + button in cart
    Then An error message is displayed

Scenario: User tries to remove an unit of an item in cart from cart
    When User clicks on - button in cart
    Then Item amount is reduced in one unit

Scenario: User tries to add a unit of an item in cart from cart
    When User clicks on + button in cart
    Then Item amount is increased in one unit

Scenario: User tries to go to shipping page
    When User clicks proceed to checkout button with items in cart
    Then Shipping page is displayed
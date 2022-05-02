Feature: User tries to change app language

Scenario: Page is in english and user tries to change it to spanish
    When User clicks in language option and selects spanish
    Then Page texts change to spanish

Scenario: Page is in spanish and user tries to change it to spanish
    When User clicks in language option and selects spanish
    Then Page remains the same

Scenario: Page is in spanish and user tries to change it to english
    When User clicks in language option and selects english
    Then Page texts change to english

Scenario: Page is in english and user tries to change it to english
    When User clicks in language option and selects english
    Then Page texts change to english


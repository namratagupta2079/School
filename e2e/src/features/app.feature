Feature: Go to the login
    Display the title

    Scenario: Login Page
        Given I am on the login page
        When I do nothing
        Then I should see the title
        And press login button

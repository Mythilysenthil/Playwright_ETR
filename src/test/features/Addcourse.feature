@Mythily
Feature: Mythily_16/07/2026_Add_Course_Tests

    Background:
        Given User clicks the Add Training button

    @AddTraining_valid
    Scenario: Add a training with valid mandatory details
        When User fills all the mandatory fields
        And User clicks the Add button
        Then User should see the training added successfully in the list

    @AddTraining_Invalid
    Scenario: Add a training with missed mandatory details
        When User clicks the Add button with missing mandatory details
        Then User should see the "Trainer Name is required." error message       
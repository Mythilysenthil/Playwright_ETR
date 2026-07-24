@Jerishwin
Feature: Jerishwin_17/07/2026_Edit_Course_Tests

    Background:
        Given User launch the url

    @AddTraining
    Scenario: Add a training with valid mandatory details
        When the User clicks the edit icon
        And User fills all the mandatory fields
        And User clicks the Update button
        Then User should see the training added successfully Updated
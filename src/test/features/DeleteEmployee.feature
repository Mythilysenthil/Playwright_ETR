@Subathra
Feature: Delete_Employee_12/08/2026

    Background:
        Given User launch the url
    
    Scenario: Verify delete functionality
        When the user enters the employee name in the filter tab
        And the user clicks the delete icon
        Then the employee record should not be displayed
@Tamil
Feature: Filter Functionality


Background:
    Given User launch the url


Scenario Outline: Verify filtering using different dropdowns
    When User selects "<Dropdown>" as "<Value>"
    Then Records should display containing "<Value>" 

        Examples:
            | EmployeeName |
            | Sriram       |
            | Jagadeep     |

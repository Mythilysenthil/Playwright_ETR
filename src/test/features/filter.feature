@Tamil
Feature: TamilKumar Filter Functionality
    Scenario Outline: Verify filtering using different dropdowns
        When User enters "<EmployeeName>" in the Employee Name filter
        Then Only records with employee name "<EmployeeName>" should be displayed

        Examples:
            | EmployeeName |
            | Sriram       |
            | Priya        |
    Scenario: Verify user can search a course by a valid course name
        When the user enters a valid course name in the Course Name filter
        Then only the matching course records should be displayed
    Scenario: Verify user can search a course by a valid EMP ID
        When the user enters a valid EMP ID in the EMP ID filter
        Then only the matching course records should be displayed based on the provided EMP ID
       

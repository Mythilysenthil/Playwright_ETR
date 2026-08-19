@Tamil
Feature: TamilKumar Filter Functionality
    @Tamil
    Scenario Outline: Verify filtering using different dropdowns based on Employee Name
        When User enters "<EmployeeName>" in the Employee Name filter
        Then Only records with employee name "<EmployeeName>" should be displayed

        Examples:
            | EmployeeName |
            | Sriram       |
            | JohnPeter    |

    @Tamil
    Scenario: Verify user can search a course by a valid course name
        When the user enters a valid course name in the Course Name filter
        Then only the matching course records should be displayed

    @Tamil
    Scenario: Verify user can search a course by a valid EMP ID
        When the user enters a valid EMP ID in the EMP ID filter
        Then only the matching course records should be displayed based on the provided EMP ID

    @Tamil
    Scenario: Verify user can search a course by a valid Trainer Name
        When the user enters a valid Trainer Name in the Trainer Name filter
        Then only the matching course records should be displayed based on the provided Trainer Name

    @Subathra
    Scenario Outline: Verify user can search for employees by a percentage of completion
        When the user enters a valid "<Percentage>" percentage in the Percentage filter
        Then only the matching employee records should be displayed based on the provided "<Percentage>"

        Examples:
            | Percentage |
            | 500        |
            | 100        |

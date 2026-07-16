Feature: TamilKumar 15-07-2026 Filter feature
    Background:
        Given User launch the url
    Scenario Outline: Filter employee records by valid employee name
        When User enters "<EmployeeName>" in the Employee Name filter
        Then Only records with employee name "<EmployeeName>" should be displayed

        Examples:
            | EmployeeName |
            | Sriram       |
            | Jagadeep     |

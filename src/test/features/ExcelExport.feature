@Subathra
Feature: Export Employee Data to Excel

  Background:
    Given Given User launch the url

  Scenario: Verify Export to Excel functionality 
    When the user clicks the Export to Excel button
    Then the Excel file should be downloaded successfully
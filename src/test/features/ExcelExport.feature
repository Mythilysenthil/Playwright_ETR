@Subathra
Feature: Export Employee Data to Excel

  Background:
    Given the user launches the application

  Scenario: Verify Export to Excel functionality 
    When the user clicks the Export to Excel button
    Then the Excel file should be downloaded successfully
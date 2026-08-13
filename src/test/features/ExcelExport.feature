@Subathra
Feature: Export_Employee_Data_to_Excel_16/07/2026

  Background:
    Given User launch the url

  Scenario: Verify Export to Excel functionality 
    When the user clicks the Export to Excel button
    Then the Excel file should be downloaded successfully
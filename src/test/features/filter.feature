@krishna
Feature: Filter Functionality

Description:
  As a user,
  I want to filter the records using different dropdowns,
  So that I can quickly find the required data without manually searching through all records.

Background:
            Given User launch the url


Scenario Outline: Verify filtering using different dropdowns
    When User selects "<Dropdown>" as "<Value>"
    Then Records should display containing "<Value>" 

Examples:
| Dropdown       | Value      |
| Project Name   | CDE        |
| Training Type  | Udemy      |
| Status         | Completed  |
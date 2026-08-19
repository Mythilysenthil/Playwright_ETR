
import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { CsvReader } from '../utilities/csvReader';
import { CourseData } from '../types/courseData.types';
import { ExcelReader } from '../utilities/ExcelReader';
import { EmpIdData } from '../types/EmpIdData.types';
import TrainerNameData from '../test-data/TrainerNameData.json';
// Read CSV data
const courseData = CsvReader.read<CourseData>("courseNameData.csv");
const empIdData = ExcelReader.read<EmpIdData>("EmpId_Data.xlsx","Sheet1");

When('User enters {string} in the Employee Name filter', async function (this: CustomWorld, employeeName: string) {
    await this.hp.setEmployeeName(employeeName);
});

Then('Only records with employee name {string} should be displayed', async function (this: CustomWorld, employeeName: string) {
    const employeeNames = await this.hp.getFilteredEmployeeNames();

    expect(employeeNames.length).toBeGreaterThan(0);

    for (const name of employeeNames) {
        expect(name.trim()).toBe(employeeName);
    }
});

When('the user enters a valid course name in the Course Name filter', async function (this: CustomWorld) {
    // Store current test data in the World (optional)
    await this.hp.setCourseName(courseData[0]?.courseName!);
});

Then('only the matching course records should be displayed', async function (this: CustomWorld) {
    const courseNames = await this.hp.getCourseNames();

    expect(courseNames.length).toBeGreaterThan(0);

    for (const course of courseNames) {
        expect(course.trim().toLowerCase()).toContain(courseData[0]?.expected!);
    }
});

When('the user enters a valid EMP ID in the EMP ID filter', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
   const empId = String(empIdData[0]?.EmpID);
    await this.hp.setEmpId(empId);
  
});

Then('only the matching course records should be displayed based on the provided EMP ID', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  const expectedEmpId = String(empIdData[0]?.Expected_EmpID);

    const empIdValues = await this.hp.getEmpIdValues();

    expect(empIdValues.length).toBeGreaterThan(0);

    for (const empId of empIdValues) {
        expect(empId.trim()).toBe(expectedEmpId!);
    }
});
When('the user enters a valid Trainer Name in the Trainer Name filter', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.hp.setTrainerName(TrainerNameData.TrainerName?.Name!);
});

Then('only the matching course records should be displayed based on the provided Trainer Name', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
    const expectedTrainerName = TrainerNameData.TrainerName?.Name!;

    const trainerNameValues = await this.hp.getTrainerNameValues();
    await expect(trainerNameValues.length).toBeGreaterThan(0);

    for (const trainerName of trainerNameValues) {
        await expect(trainerName.trim()).toBe(expectedTrainerName);
    }
});

import { When, Then, DataTable } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { CsvReader } from '../utilities/csvReader';
import { CourseData } from '../types/courseData.types';
import { ExcelReader } from '../utilities/ExcelReader';
import { EmpIdData } from '../types/EmpIdData.types';
import TrainerNameData from '../test-data/TrainerNameData.json';
import { InvalidCourseData } from '../types/InvalidCourseData.types';
import { InvalidEmpIdData } from '../types/InvalidEmpIdData.types';
// Read CSV data
const courseData = CsvReader.read<CourseData>("courseNameData.csv");
const empIdData = ExcelReader.read<EmpIdData>("EmpId_Data.xlsx","Sheet1");
const invalidCourseData = CsvReader.read<InvalidCourseData>("InvalidCourseName.csv");
const invalidEmpIdData = ExcelReader.read<InvalidEmpIdData>("InvalidEmp_ID.xlsx","Sheet1");

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

When('the user enters a valid {string} percentage in the Percentage filter', async function ( this: CustomWorld,percentage: string) {
  // Write code here that turns the phrase above into concrete actions
  await this.hp.setPercentage(percentage);
});

Then('only the matching employee records should be displayed based on the provided {string}', async function (this: CustomWorld, percentage: string) {
  // Write code here that turns the phrase above into concrete actions
  const percentageValues = await this.hp.getPercentageValues();
  for (const percentageValue of percentageValues) {
        expect(percentageValue.replace("%", "").trim()).toBe(percentage);
    }
 
});


When('User enters invalid {string} in the Employee Name filter', async function (this: CustomWorld, employeeName: string) {
  // Write code here that turns the phrase above into concrete actions
  await this.hp.setEmployeeName(employeeName);
});

Then('No records with employee name {string} should be displayed', async function (this: CustomWorld, employeeName: string) {
  // Write code here that turns the phrase above into concrete actions
  const filteredEmployeeNames = await this.hp.getFilteredEmployeeNames();
  expect(filteredEmployeeNames).toHaveLength(0);
});

When('the user enters an invalid course name in the Course Name filter', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  await this.hp.setCourseName(invalidCourseData[0]?.invalidCourseName!);
});

Then('no matching course records should be displayed', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
    const courseNames = await this.hp.getCourseNames();
    expect(courseNames).toHaveLength(0);
});

When('the user enters an invalid EMP ID in the EMP ID filter', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
    const invalidEmpId = String(invalidEmpIdData[0]?.InvalidEmp_ID!);
    await this.hp.setEmpId(invalidEmpId);
});

Then('no matching course records should be displayed based on the provided EMP ID', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  const empIdValues = await this.hp.getEmpIdValues();
  expect(empIdValues).toHaveLength(0);
});

When('the user enters an invalid Trainer Name in the Trainer Name filter', async function (this: CustomWorld) {
  await this.hp.setTrainerName(TrainerNameData.InvalidTrainerName?.Name!);
});

Then('no matching course records should be displayed based on the provided Trainer Name', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
    const trainerNameValues = await this.hp.getTrainerNameValues();
    expect(trainerNameValues).toHaveLength(0);
});
When('user enters the filter details', async function (this: CustomWorld, dataTable: DataTable) {

    const filterData = dataTable.rowsHash();

    const employeeName = filterData['Employee Name'];
    const courseName = filterData['Course Name'];
    const empId = filterData['EMP ID'];
    const trainerName = filterData['Trainer Name'];

    if (!employeeName || !courseName || !empId || !trainerName) {
        throw new Error('One or more filter values are missing in the DataTable');
    }

    await this.hp.setEmployeeName(employeeName);
    await this.hp.setCourseName(courseName);
    await this.hp.setEmpId(empId);
    await this.hp.setTrainerName(trainerName);
});
Then('user should get the records of the provided filter details', async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  const filterDetails = await this.hp.getFilterDetails();
  await expect(filterDetails.length).toBeGreaterThan(0);
  console.log("Filter Details:", filterDetails);

});
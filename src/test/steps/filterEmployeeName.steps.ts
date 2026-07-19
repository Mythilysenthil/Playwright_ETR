
import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { CsvReader } from '../utilities/csvReader';
import { CourseData } from '../types/courseData.types';

// Read CSV data
const courseData = CsvReader.read<CourseData>("courseNameData.csv");
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
import { CustomWorld } from '../world/CustomWorld';
import { When, Then } from '@cucumber/cucumber';
import { AddCourse } from "../test-data/addcourse.json";
import { expect } from '@playwright/test';

When("the user enters the employee name in the filter tab", async function (this: CustomWorld) {
    await this.hp.setEmployeeName(AddCourse.name);
});

When("the user clicks the delete icon", async function (this: CustomWorld) {
    await this.hp.clickDeleteIcon();
});

Then("the employee record should not be displayed", async function (this: CustomWorld) {
    await this.page.reload();
    await expect(this.hp.name).not.toContainText(AddCourse.name);
});
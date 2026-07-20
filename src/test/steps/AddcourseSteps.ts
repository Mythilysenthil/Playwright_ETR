import { Given, When, Then} from '@cucumber/cucumber';
import { CustomWorld } from "../world/CustomWorld";
import { AddCourse } from "../test-data/addcourse.json";
import { expect } from '@playwright/test';
 
Given(`User clicks the Add Training button`, async function (this: CustomWorld) {
    await this.sp.ClickAddCourse();
});

When(`User fills all the mandatory fields`, async function (this: CustomWorld) {
    await this.ap.enterMandatoryFields(
        AddCourse.empId,
        AddCourse.name,
        AddCourse.course,
        AddCourse.trainer,
        AddCourse.type,
        AddCourse.status,
        AddCourse.completed
    );
});

When(`User clicks the Add button`, async function (this: CustomWorld) {
    await this.ap.ClickAddBtn();
});

Then(`User should see the training added successfully in the list`, async function (this: CustomWorld) {
    const count = await this.ap.CountTable();
    expect(count).toBeGreaterThan(0);
});
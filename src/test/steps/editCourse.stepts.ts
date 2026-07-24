import { When, Then} from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
import { EditCourse } from "../test-data/editcourse.json";

When(`the User clicks the edit icon`, async function (this:CustomWorld) {
    await this.hp.clickEdit()
});

When(`User clicks the Update button`, async function (this:CustomWorld){
    await this.ap.enterMandatoryFields(
        EditCourse.empId,
        EditCourse.name,
        EditCourse.course,
        EditCourse.trainer,
        EditCourse.type,
        EditCourse.status,
        EditCourse.completed
    );
    await this.ap.ClickUpdateBtn()
});

Then(`User should see the training added successfully Updated`, async function (this:CustomWorld) {
    await expect(this.hp.name).toContainText(EditCourse.name)
});
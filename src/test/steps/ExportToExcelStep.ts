import { CustomWorld } from './../world/CustomWorld';
import {When, Then } from '@cucumber/cucumber';
import {expect} from '@playwright/test';

When("the user clicks the Export to Excel button", async function (this: CustomWorld) {
    this.download = await this.hp.clickExportButton();
});

Then("the Excel file should be downloaded successfully", async function (this:CustomWorld) {
    expect(this.download).toBeTruthy();
    const fileName = await this.download.suggestedFilename();
    expect(fileName).toMatch(/\.xlsx$/);
    console.log("Downloaded File:", fileName);
});
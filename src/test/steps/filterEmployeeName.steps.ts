import { Given,When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
import { expect } from '@playwright/test';
When('User enters {string} in the Employee Name filter', async function (this:CustomWorld,string) {
  // Write code here that turns the phrase above into concrete actions
  await this.hp.setEmployeeName(string)
});

Then('Only records with employee name {string} should be displayed', async function (this:CustomWorld,string) {
  // Write code here that turns the phrase above into concrete actions
  const employeeNames = await this.hp.getFilteredEmployeeNames();

    await expect(employeeNames.length).toBeGreaterThan(0);
     for (const name of employeeNames) {
      await expect(name.trim()).toBe(string);
    }
});
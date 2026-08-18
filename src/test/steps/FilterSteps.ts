import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../world/CustomWorld";



When('User selects {string} as {string}', async function (this: CustomWorld, dropdown, value) {

        await this.fp.selectFilter(dropdown, value);

    }
);

Then(
    'Records should display containing {string}',
    async function (this: CustomWorld, value) {

        await this.fp.verifyRecords(value);

    }
);

When('User applies all dropdown filters together', async function (this: CustomWorld) {

    // Values used in the feature scenario
    const project = 'ABC';
    const training = 'Udemy';
    const status = 'Completed';

    await this.fp.selectFilter('Project Name', project);
    await this.fp.selectFilter('Training Type', training);
    await this.fp.selectFilter('Status', status);

    // store applied values on the world for later verification
    (this as any).appliedFilters = { project, training, status };

});

Then('Records should display containing all filters', async function (this: CustomWorld) {

    const { project, training, status } = (this as any).appliedFilters || { project: 'ABC', training: 'Udemy', status: 'Completed' };

    const allPass = await this.fp.verifyRecordsContainAll(project, training, status);

    if (!allPass) {
        throw new Error('Combined filter verification failed: not all rows matched all filter values');
    }

});
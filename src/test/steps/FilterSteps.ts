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
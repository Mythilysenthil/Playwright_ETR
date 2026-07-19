import { Locator, Page, expect } from '@playwright/test';
import { logger } from '../utilities/logger';
import { getEnv } from '../utilities/envReader';
import { TIMEOUTS } from "../constants/timeouts";

export class BasePage {

    constructor(protected page: Page) {}

    async Click(locator: Locator): Promise<void> {
        try {
            logger.info('Clicking element');
            await locator.click();
            logger.info('Element clicked successfully');
        } catch (error) {
            logger.error(`Failed to click element: ${error}`);
            throw error;
        }
    }

    async Fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value, { timeout: TIMEOUTS.LONG });
    }

    async GetText(locator: Locator): Promise<string> {
        try {
            logger.info('Getting text');
            return await locator.innerText();
        } catch (error) {
            logger.error(`Failed to get text: ${error}`);
            throw error;
        }
    }

    async Navigate(): Promise<void> {
        try {
            const url = getEnv();
            logger.info(`Application Launching: ${url}`);
            await this.page.goto(url, {
                waitUntil: 'domcontentloaded'
            });
        } catch (error) {
            logger.error(`Failed to launch application: ${error}`);
            throw error;
        }
    }

    async Enter(): Promise<void> {
        try {
            logger.info('Pressing Enter key');
            await this.page.keyboard.press('Enter');
            logger.info('Enter key pressed successfully');
        } catch (error) {
            logger.error(`Failed to press Enter: ${error}`);
            throw error;
        }
    }

    async WaitForVisible(
        locator: Locator,
        timeout: number = TIMEOUTS.MEDIUM
    ): Promise<void> {
        try {
            logger.info('Waiting for element to become visible');

            await locator.waitFor({
                state: 'visible',
                timeout
            });

            logger.info('Element is visible');
        } catch (error) {
            logger.error(`Element not visible: ${error}`);
            throw error;
        }
    }

    async Wait(milliseconds: number = TIMEOUTS.SHORT): Promise<void> {
        logger.info(`Waiting for ${milliseconds} ms`);
        await this.page.waitForTimeout(milliseconds);
    }

    async WaitForRows(
        rowsLocator: Locator,
        timeout: number = TIMEOUTS.LONG
    ): Promise<void> {
        try {
            logger.info('Waiting for table rows');

            await rowsLocator.first().waitFor({
                state: 'visible',
                timeout
            });

            logger.info('Table rows are visible');
        } catch (error) {
            logger.error(`Rows are not visible: ${error}`);
            throw error;
        }
    }

    async SelectFromDropdown(
        listLocator: Locator,
        value: string
    ): Promise<void> {
        try {
            await this.WaitForVisible(listLocator.first());

            const count = await listLocator.count();

            logger.info(`Dropdown contains ${count} options`);

            for (let i = 0; i < count; i++) {

                const option = listLocator.nth(i);
                const text = (await this.GetText(option)).trim();

                logger.info(`Checking option : ${text}`);

                if (text.toLowerCase() === value.toLowerCase()) {

                    await this.Click(option);

                    logger.info(`Selected option : ${text}`);

                    return;
                }
            }

            throw new Error(`${value} not found in dropdown`);

        } catch (error) {
            logger.error(`Dropdown selection failed: ${error}`);
            throw error;
        }
    }

    async VerifyTableContains(
        rowsLocator: Locator,
        expectedValue: string
    ): Promise<void> {
        try {

            await this.WaitForRows(rowsLocator);

            const rowCount = await rowsLocator.count();

            expect(rowCount).toBeGreaterThan(0);

            logger.info(`Verifying ${rowCount} rows`);

            for (let i = 0; i < rowCount; i++) {

                const rowText = (await this.GetText(rowsLocator.nth(i))).toLowerCase();

                expect(rowText).toContain(expectedValue.toLowerCase());

                logger.info(`Row ${i + 1} verified`);
            }

        } catch (error) {
            logger.error(`Table verification failed: ${error}`);
            throw error;
        }
    }
}
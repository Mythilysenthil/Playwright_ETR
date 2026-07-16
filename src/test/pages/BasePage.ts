import { Locator, Page } from '@playwright/test';
import { logger } from '../utilities/logger';
import { getEnv } from '../utilities/envReader';

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

    async Fill(locator: Locator, value: string) {
    await locator.fill(value, { timeout: 100000 });
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

}

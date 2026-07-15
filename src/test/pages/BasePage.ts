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

    async Check(locator: Locator): Promise<void> {
        try {
            await locator.click();
            logger.info('Selected the check box');
        } catch (error) {
            logger.error(`Failed to select the check box: ${error}`);
            throw error;
        }
    }

    async First(locator: Locator): Promise<Locator> {
        try {
            logger.info('Getting first matching element');
            return locator.first();
        } catch (error) {
            logger.error(`Failed to get first element: ${error}`);
            throw error;
        }
    }

    async SelectOption(locator: Locator, value: string): Promise<void> {
        try {
            logger.info(`Selecting option: ${value}`);
            await locator.selectOption({ label: value });
            logger.info(`Option "${value}" selected successfully`);
        } catch (error) {
            logger.error(`Failed to select option "${value}": ${error}`);
            throw error;
        }
    }

    async GetAllText(locator: Locator): Promise<string[]> {
        try {
            logger.info('Getting text from all matching elements');
            return await locator.allInnerTexts();
        } catch (error) {
            logger.error(`Failed to get text from elements: ${error}`);
            throw error;
        }
    }

    async SelectCustomDropdown(dropdown: Locator, option: string): Promise<void> {
        try {
            logger.info(`Selecting custom dropdown option: ${option}`);
            await dropdown.click();
            await this.page
                .getByRole('option', { name: option, exact: false })
                .click({ timeout: 5000 });
            logger.info(`Option "${option}" selected successfully`);
        } catch (error) {
            logger.error(`Failed to select custom dropdown option "${option}": ${error}`);
            throw error;
        }
    }

    async WaitForNonEmptyText(locator: Locator, timeoutMs: number): Promise<void> {
        const deadline = Date.now() + timeoutMs;

        while (Date.now() < deadline) {
            const text = await locator.innerText();

            if (text.trim() !== '') {
                logger.info('Element contains non-empty text');
                return;
            }

            await this.page.waitForTimeout(500);
        }

        throw new Error('Timed out waiting for non-empty text');
    }

    async WaitForVisible(locator: Locator, timeoutMs: number): Promise<void> {
        try {
            logger.info('Waiting for element to be visible');
            await locator.waitFor({
                state: 'visible',
                timeout: timeoutMs
            });
            logger.info('Element is visible');
        } catch (error) {
            logger.error(`Element did not become visible: ${error}`);
            throw error;
        }
    }

    async Clear(locator: Locator): Promise<void> {
        try {
            logger.info('Clearing text');
            await locator.fill('');
            logger.info('Message cleared on the locator successfully');
        } catch (error) {
            logger.error(`Failed to clear: ${error}`);
            throw error;
        }
    }

    async ClickUntilDisabled(nextButtonLocator: Locator): Promise<void> {
        try {
            logger.info('Starting pagination click loop...');
            let pageCount = 1;

            while (true) {
                const isDisabled = await nextButtonLocator.getAttribute('disabled');

                if (isDisabled !== null) {
                    logger.info(
                        `Next button is disabled. Stopped navigating. Total pages processed: ${pageCount}`
                    );
                    break;
                }

                logger.info(`Clicking next button to move past page ${pageCount}`);
                await this.Click(nextButtonLocator);
                pageCount++;
            }
        } catch (error) {
            logger.error(`Error while clicking button until disabled: ${error}`);
            throw error;
        }
    }

    async UploadFile(locator: Locator, filePath: string): Promise<void> {
    try {
        logger.info(`Uploading file: ${filePath}`);
        await locator.setInputFiles(filePath);
        logger.info('File uploaded successfully');
    }
    catch (error) {
        logger.error(`Failed to upload file: ${error}`);
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

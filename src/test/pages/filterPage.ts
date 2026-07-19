import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class filterpage extends BasePage {

    readonly prfilter: Locator;
    readonly trainingtypef: Locator;
    readonly statusf: Locator;
    readonly list: Locator;
    readonly rows: Locator;

    constructor(page: Page) {
        super(page);

        this.prfilter = page.locator("div[role='combobox']").nth(0);
        this.trainingtypef = page.locator("div[role='combobox']").nth(1);
        this.statusf = page.locator("div[role='combobox']").nth(2);

        this.list = page.locator("ul[role='listbox'] li");
        this.rows = page.locator("//tbody/tr");
    }

    private getFilter(dropdown: string): Locator {

        switch (dropdown) {

            case "Project Name":
                return this.prfilter;

            case "Training Type":
                return this.trainingtypef;

            case "Status":
                return this.statusf;

            default:
                throw new Error(`Unknown Dropdown: ${dropdown}`);
        }
    }

    async selectFilter(dropdown: string, value: string): Promise<void> {

        const filter = this.getFilter(dropdown);

        await this.Click(filter);

        await this.SelectFromDropdown(this.list, value);

        await this.Wait();
    }

    async verifyRecords(value: string): Promise<void> {

        await this.VerifyTableContains(this.rows, value);
    }
}
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
    readonly page:Page;
    readonly employeeTrackRecord:Locator
    readonly filterEmployeeName:Locator
    readonly employeeNameFilter :Locator
    readonly courseName:Locator
    readonly courseNamesFilter:Locator
    constructor(page:Page){
        super(page);
        this.page=page;
        this.employeeTrackRecord=page.locator("//h6[@class='MuiTypography-root MuiTypography-h6 css-1rl0qlz']");
        this.filterEmployeeName=page.locator("//input[@id='_r_8_']")
        this.employeeNameFilter=page.locator("//tbody/tr/td[3]");
        this.courseName=page.locator("//input[@id='_r_9_']")
        this.courseNamesFilter=page.locator("//tbody/tr/td[4]")
    }
    async setEmployeeName(name: string) {
    await this.Fill(this.filterEmployeeName, name);

    await this.employeeNameFilter.first().waitFor({
        state: "visible",
        timeout: 10000,
    });
}
   async getFilteredEmployeeNames(){
        return await this.employeeNameFilter.allTextContents();
    }
    async setCourseName(course:string){
        await this.Fill(this.courseName,course)
    }
    async getCourseNames(){
        return await this.courseNamesFilter.allTextContents();
    }
}

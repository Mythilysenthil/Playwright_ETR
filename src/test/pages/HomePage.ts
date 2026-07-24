import { Locator, Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
    readonly page:Page;
    readonly employeeTrackRecord:Locator
    readonly filterEmployeeName:Locator
    readonly employeeNameFilter :Locator
    readonly exportToExcelButton:Locator
    readonly courseName:Locator
    readonly courseNamesFilter:Locator
    readonly edit:Locator
    readonly name:Locator
    
    constructor(page:Page){
        super(page);
        this.page=page;
        this.employeeTrackRecord=page.locator("//h6[@class='MuiTypography-root MuiTypography-h6 css-1rl0qlz']");
        this.filterEmployeeName=page.locator("//input[@id='_r_8_']")
        this.employeeNameFilter=page.locator("//tbody/tr/td[3]");
        this.exportToExcelButton=page.locator("//button[normalize-space()='Export to Excel']");
        this.courseName=page.locator("//input[@id='_r_9_']")
        this.courseNamesFilter=page.locator("//tbody/tr/td[4]")

        this.edit = page.locator("//html/body/div/div/main/div[2]/div[3]/table/tbody/tr[1]/td[11]/div/button[1]")
        this.name = page.locator("//table/tbody/tr[1]/td[3]")
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

    async clickExportButton() {
        const downloadPromise = this.page.waitForEvent("download");
        await this.Click(this.exportToExcelButton);
        return await downloadPromise;
    }      
    async setCourseName(course:string){
        await this.Fill(this.courseName,course)
    }
    async getCourseNames(){
        return await this.courseNamesFilter.allTextContents();
    }

    async clickEdit(){
        await this.Click(this.edit)
    }
    
    async getName(){
        return await this.name.textContent()
    }
}

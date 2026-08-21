import { Locator, Page} from "@playwright/test";
import { BasePage } from "./BasePage";
import { TIMEOUT } from "dns";

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
    readonly deleteIcon:Locator
    readonly TrainerNameFilter:Locator
    readonly empIdFilter:Locator
    readonly empIdFilterValue:Locator
    readonly trainerNameFilterValue:Locator
    readonly percentageFilter:Locator
    readonly percentageFilterValue:Locator
    readonly filterDetails:Locator
    constructor(page:Page){
        super(page);
        this.page=page;
        this.employeeTrackRecord=page.locator("//h6[@class='MuiTypography-root MuiTypography-h6 css-1rl0qlz']");
        this.filterEmployeeName=page.locator("//input[@id='_r_8_']")
        this.employeeNameFilter=page.locator("//tbody/tr/td[3]");
        this.exportToExcelButton=page.locator("//button[normalize-space()='Export to Excel']");
        this.courseName=page.locator("//input[@id='_r_9_']")
        this.courseNamesFilter=page.locator("//tbody/tr/td[4]")
        this.deleteIcon=page.locator("//button[@aria-label='delete']").first()
        this.edit = page.locator("//html/body/div/div/main/div[2]/div[3]/table/tbody/tr[1]/td[11]/div/button[1]")
        this.name = page.locator("//table/tbody/tr[1]/td[3]")
        this.empIdFilter=page.locator("//input[@id='_r_7_']")
        this.empIdFilterValue=page.locator("//tbody/tr/td[2]");
        this.TrainerNameFilter=page.locator("//input[@id='_r_a_']");
        this.trainerNameFilterValue=page.locator("//tbody/tr/td[5]");
        this.percentageFilter=page.locator("//input[@id='_r_h_']");
        this.percentageFilterValue=page.locator("//tbody/tr/td[10]");
        this.filterDetails=page.locator("//tbody/tr");
    }
    async setEmployeeName(name: string) {
    await this.Fill(this.filterEmployeeName, name);

    
   }

    async getFilteredEmployeeNames(){

    try {
        await this.employeeNameFilter.first().waitFor({
            state: 'visible',
            timeout: 3000
        });

        return await this.employeeNameFilter.allTextContents();

    } catch (error) {
        return [];
    }
}

    async clickExportButton() {
        const downloadPromise = this.page.waitForEvent("download");
        await this.Click(this.exportToExcelButton);
        return await downloadPromise;
    }      
    async setCourseName(course:string){
        await this.Fill(this.courseName,course)
    }
    async getCourseNames() {
        try {
            await this.courseNamesFilter.first().waitFor({
                state: 'visible',
                timeout: 3000
            });
            return await this.courseNamesFilter.allTextContents();
        } catch (error) {
            return [];
        }  
}
    async setEmpId(empId:string){
        await this.Fill(this.empIdFilter, empId.toString());
    }
    async getEmpIdValues(){
        try {
            await this.empIdFilterValue.first().waitFor({
                state: 'visible',
                timeout: 3000
            });
            return await this.empIdFilterValue.allTextContents();
        } catch (error) {
            return [];
        }
    }

    async clickDeleteIcon(){
        await this.page.waitForTimeout(3000); // Wait for 1 second before clicking the delete icon
        await this.Click(this.deleteIcon);
    }
    async clickEdit(){
        await this.Click(this.edit);
    }
    async setTrainerName(trainerName:string){
        await this.Fill(this.TrainerNameFilter, trainerName);
    }
    async getTrainerNameValues(){
        try {
            await this.trainerNameFilterValue.first().waitFor({
                state: 'visible',
                timeout: 3000
            });
            return await this.trainerNameFilterValue.allTextContents();
        } catch (error) {
            return [];
        }
    }
    async setPercentage(percentage:string){
        await this.Fill(this.percentageFilter, percentage);
    }
    async getPercentageValues(){
        await this.percentageFilterValue.first().waitFor({ state: 'visible' });
        return await this.percentageFilterValue.allTextContents();
    }
    async getFilterDetails(){
        await this.filterDetails.first().waitFor({ state: 'visible' });
        return await this.filterDetails.allTextContents();
    }
  
}

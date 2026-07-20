import {Page, Locator } from '@playwright/test';
import { BasePage } from "../../test/pages/BasePage";

export class AddcoursePage extends BasePage{
    readonly empid:Locator;
    readonly name:Locator;
    readonly course:Locator;
    readonly trainer:Locator;
    readonly type:Locator;
    readonly status:Locator;
    readonly completed:Locator;
    readonly addbtn:Locator;
    readonly count:Locator;
    
    constructor(page:Page){
        super(page);
        this.empid = page.locator("//input[@name='empId']");
        this.name = page.locator("//input[@name='employeeName']");
        this.course = page.locator("//input[@name='course']");
        this.trainer = page.locator("//input[@name='trainerName']");
        this.type = page.locator("(//div[@class='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiSelect-root css-iz33ar'])[1]");
        this.status = page.getByLabel("Status");
        this.completed = page.locator("//input[@name='percentCompleted']");
        this.addbtn = page.getByRole('button', {name: 'Add',exact: true});
        this.count = page.locator("//table[@class='MuiTable-root MuiTable-stickyHeader css-1guurvj']");
    }
    async enterMandatoryFields(empId:string, name:string, course:string, trainer:string, type:string, status:string, completed:string){
        await this.Fill(this.empid,empId);
        await this.Fill(this.name,name);
        await this.Fill(this.course,course);
        await this.Fill(this.trainer,trainer);
        await this.SelectType(type);
        await this.SelectStatus(status);
        await this.Fill(this.completed,completed);
    }
    async ClickAddBtn(){
        await this.Click(this.addbtn);
    }
    async CountTable(){
        return await this.TableCount(this.count);
    }

    async SelectType(type: string) {
    await this.type.click();
    await this.page.getByRole('option', { name: type, exact: true }).click();
    }

    async SelectStatus(status: string) {
    await this.status.click();
    await this.page.getByRole('option', { name: status, exact: true }).click();
    }
}
import {Page, Locator } from '@playwright/test';
import { BasePage } from "./BasePage";

export class AddcoursePage extends BasePage{
    readonly summary:Locator;
    readonly addCourse:Locator;
    
    constructor(page:Page){
        super(page);
        this.summary = page.locator("//button[@aria-label='Training Summary']");
        this.addCourse = page.locator("//button[@aria-label='Add Training']");
    }
}
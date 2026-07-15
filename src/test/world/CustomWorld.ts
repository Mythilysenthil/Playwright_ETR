import { Browser, BrowserContext, Page } from 'playwright';
import { World } from "@cucumber/cucumber";
import { setWorldConstructor } from '@cucumber/cucumber';
import { logger } from '../utilities/logger';
import { BasePage } from '../pages/BasePage';


export class CustomWorld extends World{
    browser!:Browser;
    browserContext!:BrowserContext;
    page!:Page;
    logger=logger;
    bp!:BasePage;
}

setWorldConstructor(CustomWorld);

import { Given, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/CustomWorld';
Given('User launch the url', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
    await this.bp.Navigate();
});

Then('User can see the website', async function (this:CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  
});
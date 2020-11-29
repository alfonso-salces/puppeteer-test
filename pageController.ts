import { Scrapper } from './pageScrapper';
import puppeteer from 'puppeteer';

export class PageController {

    constructor() {}

    async scrapeAll (browserInstance: Promise<puppeteer.Browser>, config) {
        try {
            const browser = await browserInstance;
            const scrapper = new Scrapper();
            scrapper.setUrl(config.loginUrl);
            scrapper.setReplacer(config.replaceUrl);
            scrapper.setExpectedUrl(config.redirectionUrl);
            scrapper.setUserInput(config.userInput);
            scrapper.setPassInput(config.passInput);
            scrapper.setLoginContainer(config.loginContainer);
            scrapper.setUser(config.user);
            scrapper.setPassword(config.pass);
            await scrapper.createScrapper(browser);
        }
        catch (err: any) {
            console.error(err);
        }
    }
}
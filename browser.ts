import puppeteer from 'puppeteer';

export class Browser {

    constructor () {}

    async startBrowser (): Promise<any> {
        try {
            console.log('Abriendo chrome');
            return await puppeteer.launch({
                headless: false,
                args: ["--disable-setuid-sandbox"],
                'ignoreHTTPSErrors': true
            });
        } catch (err) {
            console.error(err);
        }
    }
}
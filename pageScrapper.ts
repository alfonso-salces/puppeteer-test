import puppeteer from 'puppeteer';

export interface Person {
    sub: string;
    name: string;
    iat: number;
}

export class Scrapper {

    url: string;
    replacer: string;
    expectedUrl: string;
    userInput: string;
    passInput: string;
    loginContainer: string;
    user: string;
    pass: string;

    constructor() {}

    setUrl(url: string): void {
        this.url = url;
    }

    setReplacer(replacer: string): void {
        this.replacer = replacer;
    }

    setExpectedUrl(url: string): void {
        this.expectedUrl = url;
    }

    getReplacer(): string {
        return this.replacer;
    }

    getExpectedUrl(): string {
        return this.expectedUrl;
    }

    setUserInput(input: string): void {
        this.userInput = input;
    }

    getUserInput(): string {
        return this.userInput;
    }

    setPassInput(input: string) {
        this.passInput = input;
    }

    getPassInput(): string {
        return this.passInput;
    }

    setLoginContainer(loginContainer: string): void {
        this.loginContainer = loginContainer;
    }

    getLoginContainer(): string {
        return this.loginContainer;
    }

    setUser(user: string) {
        this.user = user;
    }

    setPassword(pass: string) {
        this.pass = pass;
    }
    
    async createScrapper (browser: puppeteer.Browser) {
        if (!!this.url) {
            const page = await browser.newPage();
            await page.goto(this.url);
            this.login(page);
            this.getTokenFromWebsite(page).then((localStorage: Object) => {
                this.openNewSite(page, localStorage['token']);
            });
        } else {
            throw(new Error('No has introducido una url hacia la que apuntar.'));
        }
    }

    private getTokenFromWebsite(page: puppeteer.Page): Promise<any> {
        return page.waitForSelector('div.container').then(() => {
            const localStorageData = page.evaluate(() => {
                let json = {};
                Object.keys(window.localStorage).forEach((key, index) => {
                    json[key] = localStorage.getItem(localStorage.key(index));
                })
                return json;
            });
            return localStorageData;
        });
    }

    private login(page: puppeteer.Page) {
        return page.waitForSelector(this.getLoginContainer()).then(() => {
            page.waitForSelector(this.getUserInput()).then(
                () => this.writeOnInput(page, this.getUserInput(), this.user)
            );
            page.waitForSelector(this.getPassInput()).then(
                () => {
                    setTimeout(() => {
                        this.writeOnInput(page, this.getPassInput(), this.pass);
                    }, 1000);
                }
            );
        });
    }

    async writeOnInput(page: puppeteer.Page, selector: string, text: string) {
        await page.focus(selector);
        page.keyboard.type(text);
    }

    private async openNewSite(page: puppeteer.Page, token: string) {
        const newUrl = this.getExpectedUrl().replace(this.getReplacer(), token);
        await page.goto(newUrl);
    }

}
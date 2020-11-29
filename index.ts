import { Browser } from './browser';
import { PageController } from './pageController';
import * as config from './config.json';

const browserInterface = new Browser();

new PageController().scrapeAll(browserInterface.startBrowser(), config);
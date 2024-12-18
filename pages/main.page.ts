import { Page as PlaywrightPage, Locator } from '@playwright/test';
import Page from './page';

class MainPage extends Page {
    mochaItem: Locator;
    americanoItem: Locator;
    espressoItem: Locator;
    cartTab: Locator;
    totalPrice: Locator;
    addOneMochaBtn: Locator;
    extraCupMsg: Locator;
    extraCupYesBtn: Locator;
    paymentDetailsPopUp: Locator;

    constructor(page: PlaywrightPage) {
        super(page),
        this.mochaItem = this.page.locator('[data-test="Mocha"]'),
        this.cartTab = this.page.locator('[href="/cart"]'),
        this.americanoItem = this.page.locator('[data-test="Americano"]'),
        this.totalPrice = this.page.locator('[data-test="checkout"]'),
        this.addOneMochaBtn = this.page.locator('[aria-label="Add one Mocha"]'),
        this.espressoItem = this.page.locator('[data-test="Espresso"]');
        this.extraCupMsg = this.page.locator('[class="promo"] > span'),
        this.extraCupYesBtn = this.page.locator('[class="yes"]'),
        this.paymentDetailsPopUp = this.page.locator('[class*="modal-content"]')
    }

    getItemCountByName(itemName: string) {
        return this.page.locator(`//*[@class="pay-container"]//span[text()="${itemName}"]/following-sibling::*`)
    }

    getItemPriceByNameAndPrice(itemName: string, itemPrice: string) {
        return this.page.locator(`//h4[contains(text(), "${itemName}")]/small[contains(text(), "${itemPrice}")]`)
    }

}

export default MainPage
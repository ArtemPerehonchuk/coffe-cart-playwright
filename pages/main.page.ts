import { Page as PlaywrightPage, Locator } from '@playwright/test';
import Page from './page';

class MainPage extends Page {
    mochaItem: Locator;
    mocaPrice: Locator;
    americanoItem: Locator;
    americanoPrice: Locator;
    espressoItem: Locator;
    espressoPrice: Locator;
    cartTab: Locator;
    totalPrice: Locator;
    addOneMochaBtn: Locator;
    extraCupMsg: Locator;
    extraCupYesBtn: Locator;
    cartPreviewMochaItemCount: Locator;
    cartPreviewAmericanoItemCount: Locator;
    cartPreviewEspressoItemCount: Locator;
    cartPreviewDiscountedMochaItemCount: Locator;
    paymentDetailsPopUp: Locator;

    constructor(page: PlaywrightPage) {
        super(page),
        this.mochaItem = this.page.locator('[data-test="Mocha"]'),
        this.cartTab = this.page.locator('[href="/cart"]'),
        this.americanoItem = this.page.locator('[data-test="Americano"]'),
        this.mocaPrice = this.page.locator('div:nth-child(3) > ul > li:nth-child(4) > h4 > small'),
        this.americanoPrice = this.page.locator('div:nth-child(3) > ul > li:nth-child(6) > h4 > small'),
        this.totalPrice = this.page.locator('[data-test="checkout"]'),
        this.addOneMochaBtn = this.page.locator('[aria-label="Add one Mocha"]'),
        this.espressoItem = this.page.locator('[data-test="Espresso"]');
        this.espressoPrice = this.page.locator('div:nth-child(3) > ul > li:nth-child(1) > h4 > small'),
        this.extraCupMsg = this.page.locator('[class="promo"] > span'),
        this.extraCupYesBtn = this.page.locator('[class="yes"]'),
        this.cartPreviewMochaItemCount = this.page.locator('//*[@class="list-item"]/div/span[text()="Mocha"]/following-sibling::*[@class="unit-desc"]'),
        this.cartPreviewAmericanoItemCount = this.page.locator('//*[@class="list-item"]/div/span[text()="Americano"]/following-sibling::*[@class="unit-desc"]'),
        this.cartPreviewEspressoItemCount = this.page.locator('//*[@class="list-item"]/div/span[text()="Espresso"]/following-sibling::*[@class="unit-desc"]'),
        this.cartPreviewDiscountedMochaItemCount = this.page.locator('//*[@class="list-item"]/div/span[text()="(Discounted) Mocha"]/following-sibling::*[@class="unit-desc"]'),
        this.paymentDetailsPopUp = this.page.locator('[class*="modal-content"]')
    }


}

export default MainPage
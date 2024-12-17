import { test, expect } from '../fixtures';

test.beforeEach(async({mainPage}) => {
    await mainPage.navigate('/');
})

test('Verify adding items to the cart', async ({page, mainPage}) => {
    await mainPage.mochaItem.click();
    await mainPage.totalPrice.hover();

    const mochaPrice = parseInt((await mainPage.mocaPrice.innerText()).split('$').join(''));
    const americanoPrice = parseInt((await mainPage.americanoPrice.innerText()).split('$').join(''));
    const espressoPrice = parseInt((await mainPage.espressoPrice.innerText()).split('$').join(''));
    let totalPrice;

    await expect(mainPage.cartTab).toContainText('1');
    await expect(mainPage.totalPrice).toContainText(mochaPrice.toString());
    await expect(mainPage.cartPreviewMochaItemCount).toContainText('1')

    await mainPage.americanoItem.click();
    await mainPage.totalPrice.hover();

    totalPrice = mochaPrice + americanoPrice;

    await expect(mainPage.cartTab).toContainText('2');
    await expect(mainPage.totalPrice).toContainText(totalPrice.toString());
    await expect(mainPage.cartPreviewAmericanoItemCount).toContainText('1');

    await mainPage.totalPrice.hover();
    await mainPage.addOneMochaBtn.click();

    totalPrice += mochaPrice;

    await expect(mainPage.cartTab).toContainText('3');
    await expect(mainPage.totalPrice).toContainText(totalPrice.toString());
    await expect(mainPage.cartPreviewMochaItemCount).toContainText('2');

    await mainPage.espressoItem.click();
    await mainPage.espressoItem.click();
    await mainPage.espressoItem.click();
    await mainPage.totalPrice.hover();

    totalPrice += (3 * espressoPrice)

    await expect(mainPage.cartPreviewEspressoItemCount).toContainText('3');
    await expect(mainPage.cartTab).toContainText('6');
    await expect(mainPage.totalPrice).toContainText(totalPrice.toString());
    await expect(mainPage.extraCupMsg).toBeVisible();
    await expect(mainPage.extraCupMsg).toHaveText('It\'s your lucky day! Get an extra cup of Mocha for $4.');

    const extraCupText = await mainPage.extraCupMsg.innerText();
    const extraCupPrice: any = extraCupText.match(/\$(\d+)/);

    await mainPage.extraCupYesBtn.click();

    totalPrice += parseInt(extraCupPrice[1]);

    await expect(mainPage.cartTab).toContainText('7');
    await expect(mainPage.totalPrice).toContainText(totalPrice.toString());

    await mainPage.totalPrice.hover();
    
    await expect(mainPage.cartPreviewEspressoItemCount).toContainText('3');
    await expect(mainPage.cartPreviewDiscountedMochaItemCount).toContainText('1');
    await expect(mainPage.cartPreviewMochaItemCount).toContainText('2');
    await expect(mainPage.cartPreviewAmericanoItemCount).toContainText('1');

    await mainPage.totalPrice.click();

    await expect(mainPage.paymentDetailsPopUp).toBeVisible();
})
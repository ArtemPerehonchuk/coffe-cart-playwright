import { test, expect } from '../fixtures';

test.beforeEach(async({mainPage}) => {
    await mainPage.navigate('/');
})

test('Verify adding items to the cart', async ({mainPage}) => {
    await mainPage.mochaItem.click();
    await mainPage.totalPrice.hover();

    const mochaPrice = parseInt((await mainPage.getItemPriceByNameAndPrice('Mocha', '8').innerText()).replace('$', ''));  
    const americanoPrice = parseInt((await mainPage.getItemPriceByNameAndPrice('Americano', '7').innerText()).replace('$', ''));
    const espressoPrice = parseInt((await mainPage.getItemPriceByNameAndPrice('Espresso', '10').innerText()).replace('$', ''));
      
    let totalPrice = mochaPrice;

    await expect(mainPage.cartTab).toContainText('1');
    await expect(mainPage.totalPrice).toContainText(totalPrice.toString());
    await expect(mainPage.getItemCountByName('Mocha')).toContainText('1')

    await mainPage.americanoItem.click();
    await mainPage.totalPrice.hover();

    totalPrice += americanoPrice;

    await expect(mainPage.cartTab).toContainText('2');
    await expect(mainPage.totalPrice).toContainText(totalPrice.toString());
    await expect(mainPage.getItemCountByName('Americano')).toContainText('1');

    await mainPage.totalPrice.hover();
    await mainPage.addOneMochaBtn.click();

    totalPrice += mochaPrice;

    await expect(mainPage.cartTab).toContainText('3');
    await expect(mainPage.totalPrice).toContainText(totalPrice.toString());
    await expect(mainPage.getItemCountByName('Mocha')).toContainText('2');

    await mainPage.espressoItem.click();
    await mainPage.espressoItem.click();
    await mainPage.espressoItem.click();
    await mainPage.totalPrice.hover();

    totalPrice += (3 * espressoPrice)

    await expect(mainPage.getItemCountByName('Espresso')).toContainText('3');
    await expect(mainPage.cartTab).toContainText('6');
    await expect(mainPage.totalPrice).toContainText(totalPrice.toString());
    await expect(mainPage.extraCupMsg).toBeVisible();
    await expect(mainPage.extraCupMsg).toHaveText('It\'s your lucky day! Get an extra cup of Mocha for $4.');

    const extraCupText = await mainPage.extraCupMsg.innerText();
    const extraCupPrice: any = (extraCupText.match(/\$(\d+)/) as string[])[1];

    await mainPage.extraCupYesBtn.click();

    totalPrice += parseInt(extraCupPrice);

    await expect(mainPage.cartTab).toContainText('7');
    await expect(mainPage.totalPrice).toContainText(totalPrice.toString());

    await mainPage.totalPrice.hover();
    
    await expect(mainPage.getItemCountByName('Espresso')).toContainText('3');
    await expect(mainPage.getItemCountByName('(Discounted) Mocha')).toContainText('1');
    await expect(mainPage.getItemCountByName('Mocha')).toContainText('2');
    await expect(mainPage.getItemCountByName('Americano')).toContainText('1');

    await mainPage.totalPrice.click();

    await expect(mainPage.paymentDetailsPopUp).toBeVisible();
})
import{ test as baseTest, expect } from '@playwright/test';
import MainPage from './pages/main.page';

type TestFixtures = {
    mainPage: MainPage
}

export const test = baseTest.extend<TestFixtures>({
    mainPage: async({page}, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage)
    }
});

export { expect };
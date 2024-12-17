import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';

class Page {
  public page: PlaywrightPage;

  constructor(page: PlaywrightPage) {
    this.page = page;
  }

  async navigate(path = '') {
    await this.page.goto(path);
  }
}

export default Page
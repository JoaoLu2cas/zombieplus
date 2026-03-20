const { expect } = require("@playwright/test");

export class Toast {
    constructor(page) {
        this.page = page;
    }

    async Message(message) {
        await expect(this.page.locator(".toast")).toHaveText(message);
      }
}
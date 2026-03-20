const {test, expect }= require('@playwright/test');
const { log } = require('node:console');
const { LoginPage } = require('../pages/LoginPage');
const { Toast } = require('../pages/Components');

let loginPage;
let toast;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
    await loginPage.visit();
});

test("Deve realizar login como administrador", async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "pwd123");
    await loginPage.isLoggedIn();
});

test("Não deve realizar login com senha inválida", async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "wrongpassword");
    await toast.Message(/Oops!/);
    
});

test("Não deve realizar login com email inválido", async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit("invalid@zombieplus.com", "wrongpassword");
    await toast.Message(/Oops!/);
});
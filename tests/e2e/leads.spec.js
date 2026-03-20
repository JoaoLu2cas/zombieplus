// @ts-check
const { test, expect } = require("@playwright/test");
const { time } = require("node:console");
const { LandingPage } = require("../pages/LandingPage");
const { Toast } = require("../pages/Components");

let landingPage;
let toast;


test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
});


test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Joao do teste", "joao@teste.com");
  await toast.Message(/nossa equipe entrará em contato!/);
});

test(" Nao Deve cadastrar com email incorreto", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Joao do teste", "joaoteste.com");
  await landingPage.alertMessage(/Email incorreto/);
});

test(" Nao Deve cadastrar com nome vazio", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "joao@teste.com");
  await landingPage.alertMessage(/Campo obrigatório/);
});

test(" Nao Deve cadastrar com email vazio", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Joao do teste", "");
  await landingPage.alertMessage(/Campo obrigatório/);
});

test(" Nao Deve cadastrar com email e nome vazios", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "");
  await landingPage.alertMessage([/Campo obrigatório/, /Campo obrigatório/]);
});

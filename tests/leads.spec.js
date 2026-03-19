// @ts-check
const { test, expect } = require("@playwright/test");
const { time } = require("node:console");
const { LandingPage } = require("./pages/LandingPage");

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Joao do teste', 'joao@teste.com');
  await landingPage.toastMessage();
});

test(" Nao Deve cadastrar com email incorreto", async ({ page }) => {
  const landingPage = new LandingPage(page);
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Joao do teste', 'joaoteste.com');
  await landingPage.alertMessage(/Email incorreto/);
});

test(" Nao Deve cadastrar com nome vazio", async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'joao@teste.com');
  await landingPage.alertMessage(/Campo obrigatório/);
});

test(" Nao Deve cadastrar com email vazio", async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Joao do teste', '');
  await landingPage.alertMessage(/Campo obrigatório/);
});

test(" Nao Deve cadastrar com email e nome vazios", async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');
  await landingPage.alertMessage([
    /Campo obrigatório/,
    /Campo obrigatório/
  ]);
});
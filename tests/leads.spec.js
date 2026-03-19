// @ts-check
const { test, expect } = require("@playwright/test");
const { time } = require("node:console");

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  //await page.click('//button[text()="Aperte o play... se tiver coragem"]');

  await page
    .getByRole("button", { name: /Aperte o play/ })
    .click();
  expect(await page
    .getByTestId("modal")
    .getByRole('heading'))
    .toHaveText("Fila de espera");
  await page
  // buscar por propriedade name do input ELEMENTO[PROD=VALOR]
    .locator('input[name=name]')
    .fill("Joao do teste");
  await page
  //estrategia de busca por placeholder, caso o elemento não tenha name ou id, ou seja difícil de acessar
    .getByPlaceholder("Seu email principal")
    .fill("joao@hotmail.com");
  await page
    .getByRole("button", { name: /Quero entrar na fila!/ })
    .click();
  await expect(page
    .locator('.toast'))
    .toHaveText(/nossa equipe entrará em contato!/);

  await expect(page
    .locator('.toast'))
    .toBeHidden({ timeout: 5000 });
});

test(" Nao Deve cadastrar com email incorreto", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page
    .getByRole("button", { name: /Aperte o play/ })
    .click();

  expect(await page
    .getByTestId("modal")
    .getByRole('heading'))
    .toHaveText("Fila de espera");

  await page
    .locator('input[name=name]')
    .fill("Joao do teste");
  await page
    .getByPlaceholder("Seu email principal")
    .fill("joao.teste.com");

  await page
    .getByRole("button", { name: /Quero entrar na fila!/ })
    .click();

  await expect(page
  .locator('.alert'))
  .toHaveText(/Email incorreto/);
});

test(" Nao Deve cadastrar com nome vazio", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page
    .getByRole("button", { name: /Aperte o play/ })
    .click();

  expect(await page
    .getByTestId("modal")
    .getByRole('heading'))
    .toHaveText("Fila de espera");

  await page
    .locator('input[name=name]')
    .fill("");
  await page
    .getByPlaceholder("Seu email principal")
    .fill("joao@teste.com");

  await page
    .getByRole("button", { name: /Quero entrar na fila!/ })
    .click();

  await expect(page
  .locator('.alert'))
  .toHaveText(/Campo obrigatório/);
});

test(" Nao Deve cadastrar com email vazio", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page
    .getByRole("button", { name: /Aperte o play/ })
    .click();

  expect(await page
    .getByTestId("modal")
    .getByRole('heading'))
    .toHaveText("Fila de espera");

  await page
    .locator('input[name=name]')
    .fill("Joao do teste");
  await page
    .getByPlaceholder("Seu email principal")
    .fill("");

  await page
    .getByRole("button", { name: /Quero entrar na fila!/ })
    .click();

  await expect(page
  .locator('.alert'))
  .toHaveText(/Campo obrigatório/);
});

test(" Nao Deve cadastrar com email e nome vazios", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page
    .getByRole("button", { name: /Aperte o play/ })
    .click();

  expect(await page
    .getByTestId("modal")
    .getByRole('heading'))
    .toHaveText("Fila de espera");

  await page
    .locator('input[name=name]')
    .fill("");
  await page
    .getByPlaceholder("Seu email principal")
    .fill("");

  await page
    .getByRole("button", { name: /Quero entrar na fila!/ })
    .click();

  await expect(page
  .locator('.alert'))
  .toHaveText([
    /Campo obrigatório/,
    /Campo obrigatório/
  ]);
});
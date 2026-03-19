const { expect } = require("@playwright/test");

export class LandingPage {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("http://localhost:3000");
  }

  async openLeadModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();
    expect(
      await this.page.getByTestId("modal").getByRole("heading"),
    ).toHaveText("Fila de espera");
  }

  async submitLeadForm(name, email) {
    await this.page
      // buscar por propriedade name do input ELEMENTO[PROD=VALOR]
      .locator("input[name=name]")
      .fill(name);
    await this.page
      //estrategia de busca por placeholder, caso o elemento não tenha name ou id, ou seja difícil de acessar
      .getByPlaceholder("Seu email principal")
      .fill(email);
    await this.page
      .getByRole("button", { name: /Quero entrar na fila!/ })
      .click();
  }

  async toastMessage() {
    await expect(this.page.locator(".toast")).toHaveText(
      /nossa equipe entrará em contato!/,
    );
  }

  async alertMessage(target) {
    await expect(this.page
  .locator('.alert'))
  .toHaveText(target);
  }
}

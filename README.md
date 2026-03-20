# ZombiePlus

Este é um projeto de testes end-to-end (e2e) para a aplicação ZombiePlus, utilizando Playwright.

## Estrutura do Projeto

- `tests/e2e/`: Contém os testes de login e leads.
- `tests/pages/`: Contém as classes de página para os testes.
- `playwright-report/`: Relatórios dos testes executados.
- `test-results/`: Resultados dos testes.

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

## Executando os Testes

Para executar todos os testes:

```bash
npx playwright test
```

Para executar um teste específico:

```bash
npx playwright test tests/e2e/login.spec.js
```

Para executar os testes em modo headless (sem interface gráfica):

```bash
npx playwright test --headed
```

## Relatórios

Após a execução dos testes, os relatórios estarão disponíveis em `playwright-report/index.html`.
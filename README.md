# 💰 Planey

Aplicação web para controle financeiro.

---

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Base UI
- json-server
- Zod
- TanStack Query
- TanStack Router
- Vite

---

🔗 [Acessar Layout no Figma](https://www.figma.com/design/cf2Mydx1d1drp0CRq1n1Yy/4Pay---Planey-Challenge?node-id=56-2278&t=tMAMQKxX68U9cSN4-0)

---

# 📥 Instruções de Instalação

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- Node.js (versão recomendada: `>= 18.x`)
- npm ou yarn

## Instalação

Clone o repositório:

```bash
git clone git@github.com:mariaporcina/financial-track-4p-fe-test.git
```

**Acesse a pasta do projeto:**

```bash
cd financial-track-4p-fe-test
```

**Instale as dependências:**

```bash
npm install
# ou
yarn install
```

## ▶️ Como Rodar o Projeto

Para iniciar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

e, para rodar o back-end:

```bash
npx json-server ./src/db.json
```

Após iniciar, o projeto estará disponível em:

http://localhost:5173/transactions

---

# 🧠 Decisões Técnicas

## React + TypeScript

TypeScript foi adotado para garantir tipagem estática, reduzir erros em tempo de desenvolvimento e facilitar a manutenção do código.

O projeto utiliza componentes funcionais e hooks, seguindo as práticas modernas do ecossistema React.

## Tailwind CSS

Tailwind CSS foi escolhido para acelerar o desenvolvimento da interface e manter consistência visual.

O uso de classes reduz a necessidade de CSS customizado e melhora a legibilidade do layout.

## Base UI

Foi utilizada a biblioteca [Base UI](https://base-ui.com/) para a definição dos componentes comuns para garantir produtividade.

Além disso, esta biblioteca proporciona controle sobre a implementação dos componentes, permitindo a personalização com facilidade.

## Estrutura do Projeto - Arquitetura MVVM

Estrutura organizada por responsabilidade para facilitar escalabilidade.

Separação clara entre componentes reutilizáveis, páginas, hooks e serviços.

# 📁 Estrutura de Pastas

```bash
src/
├─ assets/
├─ models/
├─ queries/
├─ schemas/
├─ utils/
├─ viewModels/
├─ views/
  ├─ pages
  └─ components
├─ App.tsx
└─ main.tsx
```

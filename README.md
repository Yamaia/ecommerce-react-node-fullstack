# 🛒 E-commerce Fullstack: React + Node.js

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)

Aplicação de e-commerce com **front-end em React** integrado a uma **API REST em Node.js/Express**. O projeto foi desenvolvido para o desafio **"Integrando um Backend em Node.js com um Frontend em React para um E-commerce"** da [DIO](https://www.dio.me/), partindo dos projetos de referência da expert e adicionando evoluções próprias.

## 📌 Sobre o projeto

O objetivo é demonstrar, na prática, a integração entre front-end e back-end: o React consome a API via HTTP (Axios), exibe o catálogo, gerencia o carrinho e envia pedidos, enquanto a API valida os dados, controla o estoque e persiste as informações.

## ✨ Funcionalidades

**Loja**
- Listagem de produtos com **busca**, **ordenação** (preço e nome) e **paginação**
- **Carrinho** com ajuste de quantidade respeitando o estoque, persistido no `localStorage`
- **Checkout** com nome e e-mail, gerando o pedido na API

**Administração (`/admin`)**
- **CRUD completo** de produtos (criar, editar, excluir)

**API**
- Endpoints REST para produtos e pedidos
- Validação de entrada com respostas de erro padronizadas (`400`, `404`, `409`)
- Baixa automática de estoque ao finalizar o pedido
- CORS configurável por variável de ambiente

## 🚀 Evoluções em relação ao projeto de referência

- Painel administrativo com CRUD de produtos
- Busca, ordenação e paginação no servidor
- Carrinho global com Context API + `useReducer` e persistência local
- Checkout com validação de estoque no back-end
- Camada de serviços (`services/api.js`) com Axios e tratamento centralizado de erros
- URL da API configurável via variáveis de ambiente
- Dockerfile e `docker-compose` para a API

## 🧰 Tecnologias

| Camada | Tecnologias |
|---|---|
| Front-end | React 18, Vite, React Router, Axios, Context API |
| Back-end | Node.js, Express, CORS, dotenv |
| Persistência | Arquivo JSON (simples, sem dependências externas) |
| Infra | Docker, Docker Compose |
| Versionamento | Git e GitHub |

## 📁 Estrutura

```
ecommerce-react-node/
├── backend/
│   └── src/
│       ├── data/          # persistência em JSON
│       ├── middleware/    # validação e tratamento de erros
│       ├── routes/        # products e orders
│       ├── app.js
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/    # Header, ProductCard
│       ├── context/       # CartContext
│       ├── pages/         # Home, Cart, Admin
│       ├── services/      # cliente Axios
│       └── App.jsx
└── docker-compose.yml
```

## ▶️ Como executar

**Pré-requisitos:** Node.js 18+ e npm.

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/ecommerce-react-node-fullstack.git
cd ecommerce-react-node-fullstack
```

**API**
```bash
cd backend
cp .env.example .env
npm install
npm run dev          # http://localhost:3001
```

**Front-end** (em outro terminal)
```bash
cd frontend
cp .env.example .env
npm install
npm run dev          # http://localhost:5173
```

**API com Docker (opcional)**
```bash
docker compose up --build
```

### Variáveis de ambiente

| Arquivo | Variável | Padrão |
|---|---|---|
| `backend/.env` | `PORT` | `3001` |
| `backend/.env` | `CORS_ORIGIN` | `http://localhost:5173` |
| `frontend/.env` | `VITE_API_URL` | `http://localhost:3001` |

## 🔌 Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Status da API |
| GET | `/products` | Lista com `search`, `sort` (`price_asc`, `price_desc`, `name`), `page` e `limit` |
| GET | `/products/:id` | Detalhe de um produto |
| POST | `/products` | Cria produto |
| PUT | `/products/:id` | Atualiza produto |
| DELETE | `/products/:id` | Remove produto |
| GET | `/orders` | Lista pedidos |
| POST | `/orders` | Cria pedido |

**Exemplo: criar pedido**
```json
POST /orders
{
  "customer": { "name": "Maria", "email": "maria@email.com" },
  "items": [{ "productId": 2, "quantity": 2 }]
}
```

## 📸 Screenshots

> Adicione aqui prints da loja, do carrinho e do painel admin.

## 🧠 Aprendizados

- Integração entre front-end e API REST, incluindo CORS e variáveis de ambiente
- Organização de serviços HTTP e tratamento de erros no React
- Gerenciamento de estado global com Context API e `useReducer`
- Validação e regras de negócio (estoque) no back-end
- Boas práticas de Git com commits pequenos e descritivos

## 🔮 Próximos passos

- Autenticação com JWT e rotas protegidas para o admin
- Migração da persistência para PostgreSQL
- Testes automatizados (Jest/Vitest)
- Deploy no Azure (Static Web Apps + App Service)

## 👨‍💻 Autor

Desenvolvedor focado em backend, cloud e arquitetura de soluções, trabalhando com Python, FastAPI, React e Azure.

- GitHub: [@SEU-USUARIO](https://github.com/SEU-USUARIO)
- LinkedIn: [seu-perfil](https://www.linkedin.com/in/seu-perfil)

---

Projeto desenvolvido como parte do bootcamp da [DIO](https://www.dio.me/).

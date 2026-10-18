# 🛒 E-commerce: React + Node.js (API REST)

Projeto do desafio DIO **Integrando um Backend em Node.js com um Frontend em React para um E-commerce**.
Front-end em React (Vite) consumindo uma API REST em Node.js/Express.

## Stack
- **Back-end:** Node.js, Express, CORS, dotenv (persistência em arquivo JSON)
- **Front-end:** React 18, Vite, React Router, Axios, Context API

## Evoluções implementadas
- CRUD completo de produtos (painel `/admin`)
- Validação de dados e respostas de erro padronizadas na API
- Busca, ordenação e paginação de produtos
- Carrinho com Context + `useReducer`, persistido no `localStorage`
- Checkout (`POST /orders`) com controle de estoque
- Camada de serviço com Axios e URL da API via variável de ambiente
- `docker-compose` para subir a API

## Como rodar

### API
```bash
cd backend
cp .env.example .env
npm install
npm run dev        # http://localhost:3001
```

### Front-end
```bash
cd frontend
cp .env.example .env
npm install
npm run dev        # http://localhost:5173
```

## Endpoints
| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Status da API |
| GET | `/products?search=&sort=&page=&limit=` | Lista com busca, ordenação e paginação |
| GET | `/products/:id` | Detalhe |
| POST | `/products` | Cria produto |
| PUT | `/products/:id` | Atualiza produto |
| DELETE | `/products/:id` | Remove produto |
| GET | `/orders` | Lista pedidos |
| POST | `/orders` | Cria pedido `{ customer, items:[{productId, quantity}] }` |

## Próximos passos
- Autenticação com JWT e rotas protegidas
- Banco de dados (PostgreSQL) no lugar do JSON
- Deploy no Azure (Static Web Apps + App Service)

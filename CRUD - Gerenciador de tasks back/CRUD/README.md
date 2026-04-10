# API CRUD de Tasks com PostgreSQL 🚀

API REST para gerenciamento de tasks utilizando Node.js, Express, TypeScript e PostgreSQL.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL instalado e rodando
- npm ou yarn

## 🔧 Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
PORT=3000
```

**Exemplo:**
```env
DATABASE_URL=postgresql://postgres:minhasenha@localhost:5432/tasks_db
PORT=3000
```

### 3. Criar a tabela no banco de dados

Execute o seguinte SQL no seu PostgreSQL para criar a tabela `task`:

```sql
CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50),
  priority VARCHAR(50),
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  owner_user_id INTEGER,
  board_id INTEGER,
  column_id INTEGER
);
```

## 🚀 Como executar

### Modo desenvolvimento (com hot reload)

```bash
npm run dev
```

### Modo produção

```bash
npm run build
npm start
```

## 📡 Endpoints disponíveis

### GET /api/tasks
Retorna todas as tasks do banco de dados.

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "total": 10,
  "tasks": [
    {
      "id": 1,
      "title": "Minha task",
      "description": "Descrição da task",
      "status": "pendente",
      "created_at": "2026-01-14T10:00:00.000Z"
    }
  ]
}
```

**Exemplo de uso:**
```bash
curl http://localhost:3000/api/tasks
```

### GET /api/task/:id
Retorna uma task específica pelo ID.

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "task": {
    "id": 1,
    "title": "Minha task",
    "description": "Descrição da task",
    "status": "pendente"
  }
}
```

**Resposta de erro (404):**
```json
{
  "success": false,
  "message": "Tarefa não encontrada"
}
```

**Exemplo de uso:**
```bash
curl http://localhost:3000/api/task/1
```

## 🛠️ Tecnologias utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Superset do JavaScript
- **PostgreSQL** - Banco de dados relacional
- **pg** - Driver PostgreSQL para Node.js
- **dotenv** - Gerenciamento de variáveis de ambiente
- **ts-node-dev** - Execução TypeScript em desenvolvimento

## 📂 Estrutura do projeto

```
CRUD/
├── api/
│   ├── controllers/
│   │   └── tasksController.ts    # Lógica dos endpoints
│   └── routes/
│       └── tasksRoutes.ts         # Definição das rotas
├── src/
├── server.ts                      # Arquivo principal do servidor
├── tsconfig.json                  # Configuração TypeScript
├── package.json                   # Dependências do projeto
└── .env                           # Variáveis de ambiente (criar)
```

## 📝 Notas

- Certifique-se de que o PostgreSQL está rodando antes de iniciar o servidor
- A porta padrão é 3000, mas pode ser alterada no arquivo `.env`
- Os erros são logados no console para facilitar o debug

## 🤝 Contribuindo

Este é um projeto de estudo. Fique à vontade para fazer melhorias!

---

**Desenvolvido por:** Mateus Zeviani Rodrigues

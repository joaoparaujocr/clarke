# Clarke

Clarke é uma aplicação full stack construída com **React** no front-end e **Node.js (Fastify)** no back-end, utilizando **GraphQL** para comunicação entre as camadas.

## 🚀 Tecnologias

### **Front-end**
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Material UI](https://mui.com/)

### **Back-end**
- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [GraphQL](https://graphql.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)

## 📦 Instalação

### **Pré-requisitos**
- Ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados no seu ambiente.

### **Passos para configuração**

1. **Copie o arquivo `.env.example` para `.env`**
  ```bash
    cp .env.example .env
  ```
  Configure as variáveis de ambiente conforme necessário.

2. **Suba os containers da aplicação**
  ```bash
    docker-compose up
  ```

3. **Execute as migrações do banco de dados**
  ```bash
    docker exec -it backend_clarke sh -c "npm run migration:run"
  ```

### **Acesso aos serviços**
- Backend: http://localhost:3333
- Frontend: http://localhost:3000
- Banco de Dados: http://localhost:5433
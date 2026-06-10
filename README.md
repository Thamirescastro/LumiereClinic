# ✨ Lumière Clinic

Sistema de Agendamento para Clínicas Estéticas desenvolvido em C# com .NET, utilizando Clean Architecture, Entity Framework Core, SQL Server em Docker, autenticação JWT, Swagger e testes automatizados.

---

## 📖 Sobre o Projeto

A Lumière Clinic é uma solução para gerenciamento de clínicas estéticas, permitindo o controle de pacientes, profissionais, serviços e agendamentos de forma segura e organizada.

O sistema foi desenvolvido com foco em boas práticas de engenharia de software, aplicando conceitos de arquitetura limpa, segurança, documentação e testes automatizados.

---

## 🎯 Objetivo

Automatizar o processo de agendamento e gerenciamento de atendimentos em clínicas estéticas, reduzindo erros operacionais e melhorando a experiência dos usuários.

---

## 👥 Público-Alvo

- Clínicas estéticas
- Clínicas de harmonização facial
- Consultórios dermatológicos
- Recepcionistas
- Administradores da clínica

---

## 🚀 Funcionalidades

### Autenticação

- Cadastro de usuários
- Login com JWT
- Controle de acesso por autenticação

### Pacientes

- Cadastrar paciente
- Consultar paciente
- Atualizar paciente
- Excluir paciente

### Profissionais

- Cadastrar profissional
- Consultar profissional
- Atualizar profissional
- Excluir profissional

### Serviços

- Cadastrar serviço
- Consultar serviço
- Atualizar serviço
- Excluir serviço

### Agendamentos

- Criar agendamento
- Consultar agendamento
- Atualizar agendamento
- Cancelar agendamento

---

## 🛠 Tecnologias Utilizadas

### Backend

- C#
- .NET 10
- ASP.NET Core Web API

### Banco de Dados

- SQL Server
- Entity Framework Core

### Infraestrutura

- Docker
- Docker Compose

### Segurança

- JWT Authentication
- BCrypt Password Hash

### Documentação

- Swagger / OpenAPI

### Testes

- xUnit
- FluentAssertions

---

## 📂 Estrutura do Projeto

```txt
LumiereClinic
│
├── docs
│   ├── BRD.md
│   ├── SRS.md
│   ├── CRONOGRAMA.md
│   └── DIAGRAMAS.md
│
├── src
│   ├── LumiereClinic.Domain
│   ├── LumiereClinic.Application
│   ├── LumiereClinic.Infrastructure
│   └── LumiereClinic.API
│
├── tests
│   └── LumiereClinic.Tests
│
├── docker-compose.yml
└── README.md
```

---

## 🏗 Arquitetura

O projeto segue os princípios da Clean Architecture:

### Domain

Contém as entidades e regras de negócio.

### Application

Contém casos de uso e serviços da aplicação.

### Infrastructure

Contém acesso ao banco de dados, Entity Framework e repositórios.

### API

Contém Controllers, autenticação JWT e documentação Swagger.

---

## 🔒 Segurança

O sistema utiliza:

- JWT para autenticação
- BCrypt para criptografia de senhas
- Controle de acesso via Authorize

---

## 🐳 Executando com Docker

### Subir banco SQL Server

```bash
docker compose up -d
```

Verificar container:

```bash
docker ps
```

---

## 🗄 Criando o Banco de Dados

Criar migration:

```bash
dotnet ef migrations add InitialCreate --context AppDbContext --project src/LumiereClinic.Infrastructure --startup-project src/LumiereClinic.API
```

Atualizar banco:

```bash
dotnet ef database update --context AppDbContext --project src/LumiereClinic.Infrastructure --startup-project src/LumiereClinic.API
```

---

## ▶️ Executando a Aplicação

```bash
dotnet run --project src/LumiereClinic.API
```

A aplicação ficará disponível em:

```txt
http://localhost:5083
```

---

## 📚 Swagger

Após iniciar a aplicação:

```txt
http://localhost:5083/swagger
```

No Swagger é possível:

- Testar todos os endpoints
- Realizar login
- Gerar token JWT
- Utilizar o botão Authorize

---

## 🔑 Fluxo de Autenticação

### Cadastro

Endpoint:

```http
POST /api/auth/register
```

Exemplo:

```json
{
  "fullName": "Thamires",
  "email": "thamires@email.com",
  "password": "123456"
}
```

### Login

Endpoint:

```http
POST /api/auth/login
```

Exemplo:

```json
{
  "email": "thamires@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## 🧪 Executando os Testes

```bash
dotnet test
```

Os testes verificam:

- Criação de pacientes
- Criação de serviços
- Regras de agendamento
- Validações básicas
- Integridade das entidades
  
---

## 👩‍💻 Desenvolvedora

**Thamires Mendonça e Julia Marques**

Projeto acadêmico desenvolvido para a disciplina de Engenharia de Software.

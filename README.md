# Case Stage Backend

Este repositório contém o código-fonte do backend desenvolvido como parte do processo de seleção para estágio. O projeto consiste em uma API RESTful que gerencia áreas e processos de uma empresa.

## Tecnologias Utilizadas

- **Linguagem de Programação:** JavaScript
- **Frameworks:** React.js e Node.js
- **Banco de Dados:** PostgreSQL e SQLite

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)

## Configuração do Ambiente

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

### 1. Clone o repositório:

```bash
 git clone https://github.com/GustavoOM/case_stage_backend.git
 cd case_stage_backend
```

### 2. Configuração para Desenvolvimento:

```bash
 npm install
 npm run migrate
```

Caso queira popular o banco com alguns dados, execute:

```bash
 npm run seed
```

Para iniciar o servidor:

```bash
 npm run dev
```

### 3. Configuração para Produção:

```bash
 npm install
 npm run migrate
```

Caso queira popular o banco com alguns dados, execute:

```bash
 npm run seed
```

Para realizar o build:

```bash
 npm run build
```

Para iniciar o servidor em produção:

```bash
 npm run start
```

## Endpoints da API

Aqui estão os principais endpoints disponíveis na API:

### Áreas:

- `GET /area` - Lista todas as áreas.
- `POST /area` - Cria uma nova área.
- `GET /area/:id` - Retorna os detalhes de uma área específica.
- `PUT /area/:id` - Atualiza uma área existente.
- `DELETE /area/:id` - Remove uma área.

### Processos:

- `GET /process` - Lista todos os processos.
- `POST /process` - Cria um novo processo.
- `GET /process/:id` - Retorna os detalhes de um processo específico.
- `PUT /process/:id` - Atualiza um processo existente.
- `DELETE /process/:id` - Remove um processo.

## Testes

Para rodar os testes, execute:

```bash
 npm run test
```

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch:
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'Adiciona nova feature'
   ```
4. Push para a branch:
   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

- **Nome:** Gustavo de Oliveira Martins  
- **Email:** gustavo_martins@usp.br


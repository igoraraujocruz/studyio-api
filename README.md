<h1 align="center">StudyIo</h1>

<h3 align="center">Student Platform</h3>


<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/igoraraujocruz/studyio-api">

  <a href="https://www.linkedin.com/in/igor-araujo-cruz-84a89111b/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Igor%20Araujo%20Cruz-blue">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/igoraraujocruz/studyio-api">

  <a href="https://github.com/igoraraujocruz/studyio-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/igoraraujocruz/studyio-api">
  </a>

  <a href="https://github.com/igoraraujocruz/studyio-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/igoraraujocruz/studyio-api">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/igoraraujocruz/studyio-api">
</p>

<p align="center">
  <a href="#%EF%B8%8F-sobre-o-projeto">Sobre o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#documentação">Documentação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#coleção-de-requisições-do-insomnia">Coleção de Requisições do Insomnia</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-começar">Como começar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-criar-um-usuário-administrativo">Como criar um usuário administrativo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">Licença</a>
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/run/?label=studyio-api&uri=https%3A%2F%2Fraw.githubusercontent.com%2Figoraraujocruz%2Fstudyio-api%2Fmaster%2Finsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## 💇🏻‍♂️ Sobre o projeto

API para criar, editar, deletar e buscar usuários, módulos e aulas cadastradas.


Acesse o **cliente web** dessa API clicando aqui: [StudyIo Web](https://github.com/igoraraujocruz/studyio-web)<br />


## 🚀 Tecnologias

Tecnologias que foram usadas para desenvolver esta API:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Swagger](https://swagger.io/)
- [Husky](https://github.com/typicode/husky)
- [Lint-staged](https://github.com/okonet/lint-staged)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Cross-env](https://github.com/kentcdodds/cross-env)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [Sentry](https://sentry.io/)
- [Rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible)<br /><br />

<a id="doc"></a>
## Documentação
[StudyIo-docs](http://localhost:3333/api-docs/) <br /><br /><br />

<a id ="insomnia"></a>
## Coleção de Requisições do Insomnia
Coleção de requisições:<br/>
Importe o arquivo `Insomnia.json` na aplicação do Insomnia ou clique no botão [Run in Insomnia](#insomniaButton) <br/><br /><br />

## 💻 Como começar


### Pré-Requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- Antes de começar é necessário ter instalado em sua máquina o [Docker-compose](https://docs.docker.com/compose/install/) para buidar as imagens que a aplicação necessita.
</br><br /><br />
## Clone o projeto e acesse a pasta

```bash
$ git clone https://github.com/igoraraujocruz/studyio-api && cd studyio-api
```

## Com o docker-compose instalado e com o terminal na raiz do projeto, execute os seguintes comandos:

```bash

# Set as variáveis de ambiente
na raiz do projeto, copie as informações do arquivo ".env.example", crie um arquivo chamado ".env", cole as informações e o preencha.
(O arquivo pode estar oculto)
Utilizando docker-compose o ambiente será criado automáticamente, não é necessário criar um banco de dados, ou usuário antes, apenas preenchendo o arquivo .env com as informações de sua preferência, automaticamente o docker-compose criará um ambiente com todas as informações já preenchidas no .env.

#Faça a conexão com o banco:
na raiz do projeto, copie o arquivo "ormconfig.example.js" e crie um novo com o nome "ormconfig.js".
(No ambiente de desenvolvimento/teste não é necessário nenhuma alteração).

#Depois, execute o comando:
$ docker-compose up -d
(caso esteja utilizando Linux e o sistema pedir permissão, acrescente "sudo" antes do comando)
# Este comando criará o ambiente para execução do servidor.

# Instale as dependências, executando:
$ yarn

#Após o comando anterior finalizado, execute o seguinte:
$ yarn typeorm migration:run

# Esse comando executará todas as migrations, criando as tabelas e relacionamentos necessários.

#Para iniciar a aplicação, execute:
$ yarn dev:server

# Tudo ocorrendo bem, receberá as seguintes mensagens no terminal:
server started!
Database connected
```

## Exemplo de como ficaria o arquivo .env

```bash
#App
APP_NAME=StudyIo
APP_PORT=3333
APP_SECRET=ad5a1d3a5d416ad6ad03ad51a3d4

# Postgres
POSTGRESQL_HOST=localhost
POSTGRESQL_PASSWORD=dasd46a8sda213das
POSTGRESQL_DATABASE=studyio
POSTGRESQL_PORT=15432
POSTGRESQL_USERNAME=admin

#Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

#Sentry
SENTRY_DSN=https://89715f69ce28434f9003ea0a80fded9b@o1070802.ingest.sentry.io/6067155
~
~
~

```

## Como criar um Usuário Administrativo


Com o a aplicação online, acesse a [documentação](http://localhost:3333/api-docs/) ou [Use a coleção de requisições do Insomnia](#insomniaButton)<br />
Na aba de Users, envie a requisição.<br />
Obtendo sucesso, é possível acessar o painel administrativo.
<br /><br />



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made by Igor Araujo Cruz 👋 &nbsp;[Linkedin](https://www.linkedin.com/in/igor-araujo-cruz-84a89111b/)

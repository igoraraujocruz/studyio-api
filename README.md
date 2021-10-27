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
  <a href="#-como-começar">Como começar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
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
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Como começar
Há duas formas de instalar tudo que é necessário para o projeto. A primeira de forma automática e a segunda é manualmente.

### Documentação e Teste de rotas
Coleção de requisições:<br/>
Importe o arquivo `Insomnia.json` na aplicação do Insomnia ou clique no botão [Run in Insomnia](#insomniaButton) <br/>
Documentação: [StudyIo-docs](http://localhost:3333/api-docs/)

### Pré-Requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- Uma Instancia de [PostgreSQL](https://www.postgresql.org/)

> Obs.: Eu recomendo utilizar o Docker

# Clone o projeto e acesse a pasta

```bash
$ git clone https://github.com/igoraraujocruz/studyio-api && cd studyio-api
```
# Como começar: Automático

```bash
# Instale todas as dependencias com o comando
$ yarn

# Faça uma cópia do arquivo '.env.example' e renomeie a cópia para '.env'.
# Set suas variáveis de ambiente
$ cp .env.example .env

# Crie a instancia do postgres usando docker
$ docker run --name studyio-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=studyio -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d postgres

# Com a instancia do postgres criada, execute as migrations
$ yarn typeorm migration:run

# Execute o comando para inicializar o server
$ yarn dev:server

# Fim!
```



# Como começar: Manual

```bash
# Instale todas as dependencias com o comando
$ yarn

# Faça uma cópia do arquivo '.env.example' e renomeie a cópia para '.env'.
# Set suas variáveis de ambiente
$ cp .env.example .env

# Crie a instancia do postgres usando docker
$ docker run --name studyio-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=studyio -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d postgres

# Com a instancia do postgres criada, execute as migrations
$ yarn typeorm migration:run

# Execute o comando para inicializar o server
$ yarn dev:server

# Fim!
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made by Igor Araujo Cruz 👋 &nbsp;[Linkedin](https://www.linkedin.com/in/igor-araujo-cruz-84a89111b/)

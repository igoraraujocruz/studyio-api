module.exports = {
    type: "postgres",
    host: process.env.POSTGRESQL_HOST,
    port: Number(process.env.POSTGRESQL_PORT),
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    entities: [
        `./src/modules/**/infra/typeorm/entities/*.js`
    ],
    migrations: [
        `./src/shared/infra/typeorm/migrations/*.js`
    ],
    cli: {
        "migrationsDir": `./src/shared/infra/typeorm/migrations/`
    }
}

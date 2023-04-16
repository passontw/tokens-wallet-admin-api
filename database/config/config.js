module.exports = {
  development: {
    username: "user",
    password: "pass",
    database: "token-wallets",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  uat: {
    username: "postgres",
    password: "xup6jo3fup6",
    database: "token-wallets",
    host: "139.162.109.241",
    dialect: "postgres",
    port: 2233,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};

import { Sequelize } from "sequelize";

const db = new Sequelize("app","", "", {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log
  });

  export default db
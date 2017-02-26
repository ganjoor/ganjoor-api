import * as Sequelize from 'sequelize';
require('sequelize-hierarchy')(Sequelize);

const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';

export const sequelize = new Sequelize('ganjoor', DB_USER, DB_PASS, {
  host: 'localhost',
  dialect: 'mysql'
});

export const connect = () => sequelize.sync();

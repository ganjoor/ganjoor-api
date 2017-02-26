import * as Sequelize from 'sequelize';
require('sequelize-hierarchy')(Sequelize);
require('dotenv').config();

export const sequelize = new Sequelize('ganjoor', process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql'
});

export const connect = () => sequelize.sync();

import * as Sequelize from 'sequelize';
require('sequelize-hierarchy')(Sequelize);

export const sequelize = new Sequelize('ganjoor', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export const connect = () => sequelize.sync();

import * as Sequelize from 'sequelize';
require('sequelize-hierarchy')(Sequelize);

export const sequelize = new Sequelize(
  process.env.MYSQL_URL || 'mysql://root:@localhost:3306/ganjoor'
);

export const connect = () => sequelize.sync();

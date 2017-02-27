import * as Sequelize from 'sequelize';
require('sequelize-hierarchy')(Sequelize);

const DB_URI = process.env.MYSQL_URL || 'mysql://root:@localhost:3306/ganjoor';
export const sequelize = new Sequelize(DB_URI);

export const connect = () => sequelize.sync();

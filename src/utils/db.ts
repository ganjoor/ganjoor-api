import * as Sequelize from 'sequelize';
require('sequelize-hierarchy')(Sequelize);

const db = new Sequelize('ganjoor', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export const category = db.define('category', {
  name: Sequelize.STRING
}, {
  timestamps: false,
  hierarchy: true
});

export const connect = () => db.sync();

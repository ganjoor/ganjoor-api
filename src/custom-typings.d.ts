import * as Sequelize from 'sequelize'

declare module 'sequelize' {
  interface IncludeOptions {
    hierarchy?: boolean;
  }

  interface DefineOptions {
    hierarchy?: boolean;
  }
}

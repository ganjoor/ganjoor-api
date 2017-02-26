import * as Sequelize from 'sequelize';

declare module 'sequelize' {
  interface IncludeOptions {
    hierarchy?: boolean;
  }

  interface DefineOptions<TInstance> {
    hierarchy?: boolean;
  }
}

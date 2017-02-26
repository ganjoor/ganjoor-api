import * as Sequelize from 'sequelize';
import { sequelize } from '../utils/db';

interface Poet {
  id: number;
  categoryId: number;
  name: string;
  description: string;
}

interface PoetInstance extends Sequelize.Instance<PoetInstance, Poet> {
}

const Poet = sequelize.define<PoetInstance, Poet>('poet', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  categoryId: Sequelize.INTEGER
}, {
  timestamps: false
});

export default Poet;
export { PoetInstance };

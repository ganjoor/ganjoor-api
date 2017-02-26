import * as Sequelize from 'sequelize';
import { sequelize } from '../utils/db';
import Verse from './verse';

interface Poem {
  id: number;
  title: string;
  categoryId: number;
}

interface PoemInstance extends Sequelize.Instance<PoemInstance, Poem> {
}

const Poem = sequelize.define<PoemInstance, Poem>('poem', {
  title: Sequelize.STRING,
  categoryId: Sequelize.INTEGER
}, {
  timestamps: false
});

Poem.hasMany(Verse);

export default Poem;
export { PoemInstance };

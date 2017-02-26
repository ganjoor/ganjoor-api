import * as Sequelize from 'sequelize';
import { sequelize } from '../utils/db';

interface Verse {
  id: number;
  poemId: number;
  order: number;
  position: number;
  text: string;
}

interface VerseInstance extends Sequelize.Instance<VerseInstance, Verse> {
}

const Verse = sequelize.define<VerseInstance, Verse>('verse', {
  text: Sequelize.TEXT,
  order: Sequelize.INTEGER,
  position: Sequelize.INTEGER
}, {
  timestamps: false
});

export default Verse;
export { VerseInstance };

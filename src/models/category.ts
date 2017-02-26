import * as Sequelize from 'sequelize';
import { sequelize } from '../utils/db';

interface Category {
  id?: number;
  name?: string;
}

interface CategoryInstance extends Sequelize.Instance<CategoryInstance, Category> {
}

const Category = sequelize.define<CategoryInstance, Category>('category', {
  name: Sequelize.STRING
}, {
  timestamps: false,
  hierarchy: true
});

export default Category;
export { CategoryInstance };

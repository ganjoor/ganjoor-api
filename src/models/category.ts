import * as Sequelize from 'sequelize';
import { sequelize } from '../utils/db';

interface Category {
  id: number;
  name: string;
  children?: CategoryInstance[];
}

interface CategoryInstance extends Sequelize.Instance<CategoryInstance, Category> {
}

/**
 * @swagger
 * definitions:
 *   CategoryList:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Category'
 *   Category:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       parentId:
 *         type: integer
 *       name:
 *         type: string
 *       hierarchyLevel:
 *         type: integer
 *       children:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Category'
 */
const Category = sequelize.define<CategoryInstance, Category>('category', {
  name: Sequelize.STRING
}, {
  timestamps: false,
  hierarchy: true
});

export default Category;
export { CategoryInstance };

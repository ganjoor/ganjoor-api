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

/**
 * @swagger
 * definitions:
 *   PoetList:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Poet'
 *   Poet:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       categoryId:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 *   SinglePoet:
 *     allOf:
 *       - $ref: '#/definitions/Poet'
 *       - properties:
 *           categories:
 *             type: array
 *             items:
 *               $ref: '#/definitions/Category'
 */
const Poet = sequelize.define<PoetInstance, Poet>('poet', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  categoryId: Sequelize.INTEGER
}, {
  timestamps: false
});

export default Poet;
export { PoetInstance };

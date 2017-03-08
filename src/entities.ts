import * as R from 'ramda';
import * as errors from 'feathers-errors';
import CategoryModel from './models/category';
import PoetModel from './models/poet';
import PoemModel from './models/poem';
import VerseModel from './models/verse';

export namespace Category {
  export function findById(id: number) {
    return CategoryModel.find({
      where: { id },
      include: [{
        as: 'descendents',
        hierarchy: true,
        model: CategoryModel
      }]
    }).then(result => {
      if (result === null) {
        return Promise.reject(new errors.NotFound('Category does not exist'));
      }
      return result;
    });
  }

  export function findByPoetId(poetId: number) {
    return PoetModel
      .findById(poetId)
      .then(result => {
        if (result === null) {
          return Promise.reject(new errors.NotFound('Poet does not exist'));
        }
        return findById(result.get('categoryId'));
      });
  }
}

export namespace Poet {
  export function findAll() {
    return PoetModel.findAll()
      .then(
        result => result.map(
          item => R.omit(['description'], item.toJSON())
        )
      );
  }

  export function findById(id: number) {
    return PoetModel
      .findById(id)
      .then(poet => {
        if (poet === null) {
          return Promise.reject(new errors.NotFound('Poet does not exist'));
        }
        const obj = poet.toJSON();
        return Category.findById(obj.categoryId)
          .then(category => {
            const categories = category.toJSON();
            return {
              ...R.omit(['categoryId'], obj),
              categories: categories.children
            };
          });
      });
  }
}

export namespace Poem {
  export function findById(id: number) {
    return PoemModel.findById(id, {
      include: [{
        model: VerseModel
      }]
    }).then(result => {
      if (result === null) {
        return Promise.reject(new errors.NotFound('Poem does not exist'));
      }
      return result;
    });
  }

  export function findAllByCategoryId(categoryId: number) {
    return PoemModel.findAll({
      where: { categoryId }
    });
  }
}

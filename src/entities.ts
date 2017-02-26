import * as R from 'ramda';
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
    });
  }

  export function findByPoetId(poetId: number) {
    return PoetModel
      .findById(poetId)
      .then(result => findById(result.get('categoryId')));
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
    });
  }

  export function findAllByCategoryId(categoryId: number) {
    return PoemModel.findAll({
      where: { categoryId }
    });
  }
}

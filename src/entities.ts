import CategoryModel from './models/category';
import PoetModel from './models/poet';

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
    return PoetModel.findAll();
  }

  export function findById(id: number) {
    return PoetModel.findById(id);
  }
}

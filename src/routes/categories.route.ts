import { Router } from 'express';
import { ModelDefined } from 'sequelize';
import Categories from 'models/categories.model';
import CategoriesController from 'controllers/categories.controller';
import CreateCategoriesDto from 'dtos/categories.dtos';
import Route from 'interfaces/routes.interface';
import validationMiddleware from 'middlewares/validation.middleware';
import authMiddleware from 'middlewares/auth.middleware';
import resourceExistenceMiddleware from 'middlewares/resource-existence.middleware';

export default class CategoriesRoute implements Route {
  public path = '/categories';
  public router = Router();
  public controller = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.makeRoute(''), authMiddleware, this.controller.category);

    this.router.post(
      this.makeRoute(''),
      authMiddleware,
      validationMiddleware(CreateCategoriesDto, 'body'),
      this.controller.create,
    );

    this.router.get(
      this.makeRoute('/:id(\\d+)'),
      authMiddleware, // requires auth
      resourceExistenceMiddleware(Categories as ModelDefined<any, any>),
      this.controller.getCategoryById,
    );

    this.router.patch(
      this.makeRoute('/:id(\\d+)'),
      authMiddleware, // requires auth
      resourceExistenceMiddleware(Categories as ModelDefined<any, any>),
      validationMiddleware(CreateCategoriesDto, 'body', true),
      this.controller.updateCategory,
    );

    this.router.delete(
      this.makeRoute('/:id(\\d+)'),
      authMiddleware, // requires auth
      resourceExistenceMiddleware(Categories as ModelDefined<any, any>),
      this.controller.deleteCategory,
    );
  }

  public makeRoute(route: string) {
    return `${this.path}${route}`;
  }
}

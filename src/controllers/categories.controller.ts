import { NextFunction, Request, Response } from 'express';
import service from 'services/categories.service';
import Categories from 'models/categories.model';
import CreateCategoriesDto from 'dtos/categories.dtos';
import { RequestWithUser } from 'interfaces/auth.interface';

class CategoriesController {
  public service = new service();

  public category = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAll: Categories[] = await this.service.category();
      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = Number(req.params.id);

    try {
      const findOneCategoryData: Categories = await this.service.findCategoryById(categoryId);
      res.status(200).json({ data: findOneCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data: CreateCategoriesDto = req.body;

    try {
      const createOne = await this.service.create(data);
      res.status(201).json({ data: createOne, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);
    const userData: CreateCategoriesDto = req.body;
    try {
      const updateCategoryData: Categories = await this.service.updateCategory(userId, userData);
      res.status(200).json({ data: updateCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const categoryId = Number(req.params.id);
    try {
      const deleteUserData: Categories = await this.service.deleteCategoryData(categoryId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesController;

import { NextFunction, Request, Response } from 'express';
import service from 'services/listings.service';
import Listing from 'models/listings.model';
import CreateListingDto from 'dtos/listings.dtos';
import { RequestWithUser } from 'interfaces/auth.interface';
import { HttpException } from 'utils/util';

class ListingsController {
  public service = new service();

  public list = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAll: Listing[] = await this.service.list();
      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getListById = async (req: Request, res: Response, next: NextFunction) => {
    const listId = Number(req.params.id);

    try {
      const findOneListData: Listing = await this.service.findListById(listId);
      res.status(200).json({ data: findOneListData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data: CreateListingDto = req.body;

    try {
      const createOne = await this.service.create(data, req.user);
      res.status(201).json({ data: createOne, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);
    const userData: CreateListingDto = req.body;

    try {
      const findUser = await this.service.findListById(userId);
      if (req.user.id !== findUser.id) {
        next(new HttpException(403, 'Not allowed'));
        return;
      }

      const updateListData: Listing = await this.service.updateList(userId, userData);
      res.status(200).json({ data: updateListData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const listId = Number(req.params.id);

    try {
      const findUser = await this.service.findListById(listId);
      if (req.user.id !== findUser.id) {
        next(new HttpException(403, 'Not allowed'));
        return;
      }

      const deleteUserData: Listing = await this.service.deleteListData(listId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ListingsController;

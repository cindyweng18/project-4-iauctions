import { Router } from 'express';
import { ModelDefined } from 'sequelize';
import Bids from 'models/bids.model';
import BidsController from 'controllers/bids.controller';
import Route from 'interfaces/routes.interface';
import validationMiddleware from 'middlewares/validation.middleware';
import authMiddleware from 'middlewares/auth.middleware';
import resourceExistenceMiddleware from 'middlewares/resource-existence.middleware';
import CreateBidsDto from 'dtos/bids.dtos';

export default class BidsRoute implements Route {
  public path = '/listings';
  public router = Router();
  public controller = new BidsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.makeRoute('/:id(\\d+)/bids'), authMiddleware, this.controller.bid);

    this.router.post(
      this.makeRoute('/:id(\\d+)/bids'),
      authMiddleware,
      validationMiddleware(CreateBidsDto, 'body'),
      this.controller.create,
    );
  }

  public makeRoute(route: string) {
    return `${this.path}${route}`;
  }
}

import { NextFunction, Request, Response } from 'express';
import service from 'services/bids.service';
import Bids from 'models/bids.model';
import { RequestWithUser } from 'interfaces/auth.interface';
import { HttpException } from 'utils/util';
import CreateBidsDto from 'dtos/bids.dtos';

class BidsController {
  public service = new service();

  public bid = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAll: Bids[] = await this.service.bid();
      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const listId = Number(req.params.id);
    const data: CreateBidsDto = req.body;

    try {
      const findList = await this.service.findListById(listId);
      if (data.amount <= findList.price) {
        next(new HttpException(403, 'Bidding price lower or equal to listing price.'));
        return;
      } else {
        const createOne = await this.service.create(data, req.user, listId);
        res.status(201).json({ data: createOne, message: 'created' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default BidsController;

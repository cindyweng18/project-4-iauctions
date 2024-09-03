import { NextFunction, Request, Response } from 'express';
import service from 'services/comments.service';
import Comments from 'models/comments.model';
import CreateCommentsDto from 'dtos/comments.dtos';
import { RequestWithUser } from 'interfaces/auth.interface';
import { HttpException } from 'utils/util';

class CommentsController {
  public service = new service();

  public comment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAll: Comments[] = await this.service.comment();
      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getComment = async (req: Request, res: Response, next: NextFunction) => {
    const listId = Number(req.params.id);
    try {
      const findAll: Comments = await this.service.findCommentByListId(listId);
      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const listId = Number(req.params.list_id);
    const data: CreateCommentsDto = req.body;

    try {
      const createOne = await this.service.create(data, req.user, listId);
      res.status(201).json({ data: createOne, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);
    const userData: CreateCommentsDto = req.body;

    try {
      const findUser = await this.service.findCommentByListId(userId);
      if (req.user.id !== findUser.id) {
        next(new HttpException(403, 'Not allowed'));
        return;
      }

      const updateCommentData: Comments = await this.service.updateComment(userId, userData);
      res.status(200).json({ data: updateCommentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const listId = Number(req.params.list_id);

    try {
      const findUser = await this.service.findCommentByListId(listId);
      if (req.user.id !== findUser.id) {
        next(new HttpException(403, 'Not allowed'));
        return;
      }

      const deleteCommentData: Comments = await this.service.deleteCommentData(listId);
      res.status(200).json({ data: deleteCommentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentsController;

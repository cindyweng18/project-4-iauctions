import { Router } from 'express';
import CommentsController from 'controllers/comments.controller';
import CreateCommentDto from 'dtos/comments.dtos';
import Route from 'interfaces/routes.interface';
import validationMiddleware from 'middlewares/validation.middleware';
import authMiddleware from 'middlewares/auth.middleware';
import resourceExistenceMiddleware from 'middlewares/resource-existence.middleware';
import { ModelDefined } from 'sequelize';
import Comment from 'models/comments.model';

export default class CommentsRoute implements Route {
  public path = '/listings';
  public router = Router();
  public controller = new CommentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.makeRoute('/:list_id(\\d+)/comments'), authMiddleware, this.controller.comment);

    this.router.post(
      this.makeRoute('/:list_id(\\d+)/comments'),
      authMiddleware,
      validationMiddleware(CreateCommentDto, 'body'),
      this.controller.create,
    );

    this.router.get(
      this.makeRoute('/:list_id(\\d+)/comments/:comment_id(\\d+)'),
      authMiddleware, // requires auth
      resourceExistenceMiddleware(Comment as ModelDefined<any, any>),
      this.controller.getComment,
    );

    this.router.patch(
      this.makeRoute('/:list_id(\\d+)/comments/:comment_id(\\d+)'),
      authMiddleware, // requires auth
      resourceExistenceMiddleware(Comment as ModelDefined<any, any>),
      validationMiddleware(CreateCommentDto, 'body', true),
      this.controller.updateComment,
    );

    this.router.delete(
      this.makeRoute('/:list_id(\\d+)/comments/:comment_id(\\d+)'),
      authMiddleware, // requires auth
      resourceExistenceMiddleware(Comment as ModelDefined<any, any>),
      this.controller.deleteComment,
    );
  }

  public makeRoute(route: string) {
    return `${this.path}${route}`;
  }
}

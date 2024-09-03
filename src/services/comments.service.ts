import { ModelDefined } from 'sequelize';
import { isEmpty, HttpException } from 'utils/util';
import Comment from 'models/comments.model';
import User from 'models/users.model';
import CreateCommentsDto from 'dtos/comments.dtos';
import Listing from 'models/listings.model';

class CommentService {
  public comments = Comment;

  public async comment(): Promise<Comment[]> {
    const comments: Comment[] = await this.comments.findAll();
    return comments;
  }

  public async findCommentByListId(listId: number): Promise<Comment> {
    const findComment: Comment = await this.comments.findByPk(listId);
    return findComment;
  }

  public async create(commentData: CreateCommentsDto, user: User, listId: number): Promise<Comment> {
    const createdComment = await this.comments.create({ ...commentData, userId: user.id, listingId: listId });
    return createdComment;
  }

  public async updateComment(listId: number, commentData: CreateCommentsDto): Promise<Comment> {
    if (isEmpty(commentData)) throw new HttpException(400, 'Empty payload');

    await this.comments.update(commentData, { where: { id: listId } });

    const updateComment: Comment = await this.comments.findByPk(listId);
    return updateComment;
  }

  public async deleteCommentData(commentId: number): Promise<Comment> {
    if (isEmpty(commentId)) throw new HttpException(400, "Comment_id doesn't exist");

    const findComment: Comment = await this.comments.findByPk(commentId);
    if (!findComment) throw new HttpException(404, 'Not found');

    await this.comments.destroy({ where: { id: commentId } });

    return findComment;
  }
}

export default CommentService;

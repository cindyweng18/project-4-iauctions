import { Request } from 'express';
import User from 'models/users.model';
import Categories from 'models/categories.model';
import UsersRoute from 'routes/users.route';
import Listing from 'models/listings.model';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
  user: User;
}

export interface RequestWithUser extends Request {
  user: User;
}

import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from 'dtos/users.dto';
import AuthService from 'services/auth.service';
import { TokenData } from 'interfaces/auth.interface';
import User from 'models/users.model';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const signUpUserData: TokenData = await this.authService.signup(userData);
      // Set the token in an HttpOnly cookie
      // res.cookie('authToken', signUpUserData.token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',  // Ensures cookie is only sent over HTTPS in production
      //   sameSite: 'strict',   // Ensures the cookie is only sent to the same site
      //   maxAge: 24 * 60 * 60 * 1000, // Expires after 1 day (24 hours)
      // });
      // console.log('Response Headers:', res.getHeaders());
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: User = req.body as User;

    try {
      const tokenData: TokenData = await this.authService.login(userData);
      res.status(200).json({ data: tokenData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

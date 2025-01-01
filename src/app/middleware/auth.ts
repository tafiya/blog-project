// auth.ts
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { catchAsync } from '../utils/catchAsync';

import config from '../config';
import { User } from '../modules/user/user.model';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization;
    const authorizationHeader = req.headers.authorization;

    // Check if the Authorization header is provided
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Authorization token is missing or invalid',
      );
    }

    // Extract the token after "Bearer "
    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;

    const { role, userEmail } = decoded;
    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(userEmail);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.isBlocked;

    if (userStatus) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized  hi hi!',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  isBlocked: boolean;
  isDeleted: boolean;
}
export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;

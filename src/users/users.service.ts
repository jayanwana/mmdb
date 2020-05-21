import { Injectable } from '@nestjs/common';
import {InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') readonly userModel: Model<Users>){}

  async createUser(email: string, password: string): Promise<Users> {
    try {
      const _user = new this.userModel({email, password});
      const user = await _user.save();
      return user
    } catch(error) {
      throw error
    }
  };

  async findUser(email: string): Promise<Users | undefined> {
    let user = await this.userModel.findOne({email: email}, (error, user) => {
      if (error) {return undefined};
      return user
    });
    return user
  }
}

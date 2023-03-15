import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { USER_REPOSITORY } from 'src/providers/database/repository.token';
import { UserQueryDto } from './dto/user-query.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserCreationAttributes, UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private userRepo: typeof UserModel) {}

  async createOne(data: UserCreationAttributes) {
    return this.userRepo.create(data, {
      returning: false,
    });
  }

  async findOne({ id, name, email }: UserQueryDto) {
    const opArr = [];
    if (email)
      opArr.push({
        email: {
          [Op.like]: `%${email}%`,
        },
      });
    if (name)
      opArr.push({
        name: {
          [Op.like]: `%${name}%`,
        },
      });
    if (id)
      opArr.push({
        id: {
          [Op.like]: `%${id}%`,
        },
      });
    return this.userRepo.findOne({
      ...(!!opArr.length && {
        where: {
          [Op.or]: opArr,
        },
      }),
      attributes: {
        exclude: ['password'],
      },
    });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: {
        email,
      },
      attributes: { exclude: ['password'] },
    });
  }

  async findById(id: string) {
    return this.userRepo.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async findAll() {
    return this.userRepo.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async updateOne(id: string, data: UserUpdateDto) {
    let user = await this.findById(id);
    await user.update(data);
    return user.save();
  }

  async deleteOne(id: string) {
    const user = await this.findById(id);
    return user.destroy();
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserCreationAttributes } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(data: UserCreationAttributes) {
    console.log(data);
    const user = await this.userService.findByEmail(data.email);
    if (user) throw new ConflictException('Account existed');
    const hashedPassword = await hash(data.password, 10);
    return this.userService.createOne({
      ...data,
      password: hashedPassword,
    });
  }
}

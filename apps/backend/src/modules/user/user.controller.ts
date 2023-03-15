import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { UserQueryDto } from './dto/user-query.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  user(@Query() data: UserQueryDto) {
    return this.userService.findOne(data);
  }

  @Get('all')
  users() {
    return this.userService.findAll();
  }

  @Put()
  updateUser(@Body() data) {
    console.log(data);
    return this.userService.updateOne(data.id, { ...data });
  }

  @Delete()
  deleteUser(@Query() { id }) {
    this.userService.deleteOne(id);
  }
}

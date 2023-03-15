import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { v4 } from 'uuid';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  async singup(
    @Body() data: UserSignupDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let filePath: string | null = null;
    if (file) {
      filePath = `${v4()}${extname(file.originalname)}`;
      const staticDir = join(__dirname, '../../..', 'static', filePath);
      await writeFile(staticDir, file.buffer);
    }
    // process file
    return this.authService.signUp({ ...data, avatar: filePath });
  }
}

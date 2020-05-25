import { Controller, Req, Post, Body, UseGuards, Get, Param, Res, UseInterceptors} from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoggingInterceptor } from './utils/logging.interceptor';


@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  };

  @Post('register')
  async register(@Body('email') email: string, @Body('password') password:string) {
    const user = await this.usersService.createUser(email, password);
    if (user) {
      return user.id as string;
    }
  };

  @Get('static/MarketImages/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res: Response) {
    const imagepath: string = join(process.cwd(), "./static/MarketImages", image)
    return res.sendFile(imagepath);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test(@Body('email') email: string) {
    const user = await this.usersService.findUser(email)
    if (!user) {return {}}
    return user
  }
};

import { Controller, Request, Post, Body, UseGuards, Logger} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  private readonly logger = new Logger(AppController.name)

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  };

  @Post('register')
  async register(@Body('email') email: string, @Body('password') password:string) {
    const user = await this.usersService.createUser(email, password);
    if (user) {
      return user.id as string
    }
  };

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test(@Body('email') email: string) {
    const user = await this.usersService.findUser(email)
    if (!user) {return {}}
    return user
  }
};

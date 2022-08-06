import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/modules/users/services/user.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginUser: LoginUserDto): Promise<{ token: string }> {
    return this.authService.login(loginUser);
  }
}

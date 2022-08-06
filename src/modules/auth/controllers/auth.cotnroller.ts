import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
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

  @Post('signup')
  async signup(@Body() createdUser: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.createUser(createdUser);
  }
}

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

  @Post('/login')
  login(@Body() loginUser: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginUser);
  }

  @Post('/signup')
  signup(@Body() createdUser: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.createUser(createdUser);
  }
}

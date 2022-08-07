import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(loginUser: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      select: ['id', 'password'],
      where: { login: loginUser.login },
    });

    if (!user) {
      throw new HttpException(`User was not founded`, HttpStatus.FORBIDDEN);
    }

    const isValidPassword = await bcrypt.compare(
      loginUser.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException(`Password is not correct`, HttpStatus.FORBIDDEN);
    }
    const accessToken = this.jwtService.sign(
      { id: user.id, login: loginUser.login },
      { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    );
    return { accessToken };
  }
}

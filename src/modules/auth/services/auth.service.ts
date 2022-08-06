import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../dto/login-user.dto';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(loginUser: LoginUserDto): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({
      select: ['id', 'password'],
      where: { login: loginUser.login },
    });
    if (!user || loginUser.password !== user.password) {
      throw new HttpException(
        `User with login = ${loginUser.login} was not found`,
        HttpStatus.FORBIDDEN,
      );
    }
    const token = await jwt.sign(
      { id: user.id, login: loginUser.login },
      process.env.JWT_SECRET_KEY,
    );
    return { token };
  }
}

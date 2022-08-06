import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../users/services/user.service';
import { AuthController } from './controllers/auth.cotnroller';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

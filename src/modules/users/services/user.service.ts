import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user)
      throw new NotFoundException(`User with id = ${userId} was not found`);
    return user.toResponse();
  }

  async createUser(userDto: CreateUserDto) {
    await this.isLoginExists(userDto.login);

    const createdUser = this.userRepository.create(userDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async updateUser(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!updatedUser) {
      throw new NotFoundException(`User with id = ${userId} was not found`);
    }
    if (updatedUser.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(`Old password is wrong`);
    }

    updatedUser.password = updatePasswordDto.newPassword;

    return (await this.userRepository.save(updatedUser)).toResponse();
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${userId} was not found`);
    }
  }

  async findByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (user) return user;
    throw new NotFoundException(`User with login = ${login} was not found`);
  }

  async isLoginExists(login: string): Promise<void> {
    const user = await this.findByLogin(login);
    if (user)
      throw new ForbiddenException(`User with login = ${login} already exists`);
  }
}

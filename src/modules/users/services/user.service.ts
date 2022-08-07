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
import * as bcrypt from 'bcrypt';
import { getHashedPassword } from '../../../utils/getHashedPassword';

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
    const hashedPassword = await getHashedPassword(userDto.password);
    const newUserDto = { ...userDto, password: hashedPassword };
    const createdUser = this.userRepository.create(newUserDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async updateUser(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!updatedUser) {
      throw new NotFoundException(`User with id = ${userId} was not found`);
    }

    const newHashedNewPassword = await getHashedPassword(
      updatePasswordDto.newPassword,
    );

    const isValidPassword = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      updatedUser.password,
    );
    if (!isValidPassword) {
      throw new ForbiddenException(`Old password is wrong`);
    }

    updatedUser.password = newHashedNewPassword;

    return (await this.userRepository.save(updatedUser)).toResponse();
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${userId} was not found`);
    }
  }
}

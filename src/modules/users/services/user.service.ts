import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../user.interface';
import { v4 as uuid4 } from 'uuid';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly users: IUser[] = [];

  public async getAllUsers(): Promise<IUser[]> {
    return this.users;
  }

  public async getUserById(id: string): Promise<IUser> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  public async createUser(user: CreateUserDto): Promise<IUser> {
    const createdAt = +Date.now();
    const updatedAt = +Date.now();
    const version = 1;
    const newUser = {
      login: user.login,
      id: uuid4(),
      createdAt,
      updatedAt,
      version,
    };
    this.users.push({ ...newUser, password: user.password });
    return newUser;
  }

  public async updateUser(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser> {
    const index = this.users.findIndex((user) => user.id === id);
    const currentUser = this.users[index];
    if (!currentUser) {
      throw new NotFoundException('User not found');
    } else if (currentUser.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    } else {
      const updatedUser = {
        id,
        login: currentUser.login,
        version: currentUser.version + 1,
        createdAt: currentUser.createdAt,
        updatedAt: +Date.now(),
      };

      this.users[index] = {
        ...updatedUser,
        password: updatePasswordDto.newPassword,
      };
      return updatedUser;
    }
  }

  public async deleteUser(id: string): Promise<IUser> {
    const index = this.users.findIndex((user) => user.id === id);
    const currentUser = this.users[index];
    if (!currentUser) {
      throw new NotFoundException('User not found');
    } else {
      this.users.splice(index, 1);
      return currentUser;
    }
  }
}

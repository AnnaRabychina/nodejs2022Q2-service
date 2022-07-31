import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getUsers(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUser> {
    return this.userService.createUser(createUserDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser> {
    return this.userService.updateUser(id, updatePasswordDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IUser> {
    return this.userService.deleteUser(id);
  }
}

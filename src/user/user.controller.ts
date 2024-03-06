import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Put(':id')
  async updateProfile(
    @Body() body: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.userService.updateUser(id, body);
    return {
      success: true,
      message: 'Profile updated!',
    };
  }

  @Delete(':id')
  async deleteAccount(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return {
      success: true,
      message: 'Account deleted',
    };
  }
}

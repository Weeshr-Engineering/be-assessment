import { Prisma } from '@prisma/client';
import { UserService } from '../user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { verifyHash } from '../utils/utils';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    const userExist = await this.userService.findUserByEmail(body.email);
    if (userExist) {
      throw new ConflictException('User with the email exists');
    }
    return await this.userService.createUser(body);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid email address');
    }
    const isValid = await verifyHash(password, user.password);
    if (!isValid) {
      throw new BadRequestException('Invalid login credential');
    }

    const token = await this.jwtService.signAsync(
      { userId: user.id },
      { secret: process.env['JWT_SECRET'], expiresIn: 86400 },
    );

    return token;
  }
}

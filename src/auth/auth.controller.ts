import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    const user = await this.authService.signUp(body);
    delete user['password'];
    return {
      success: true,
      message: 'User signup successful',
      data: user,
    };
  }

  @Post('signin')
  async signIn(
    @Body() body: SignInDto,
  ): Promise<{ success: boolean; message: string; accessToken: string }> {
    const token = await this.authService.signIn(body.email, body.password);
    return {
      success: true,
      message: 'Signin successful!',
      accessToken: token,
    };
  }
}

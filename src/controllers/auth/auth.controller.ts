import { UserDto } from './../../services/user/Dto/user.dto';
import { ResetPasswordDto } from './../../services/auth/Dto/reset.password';
import { LoginDto } from './../../services/auth/Dto/loginDto';
import { AuthService } from './../../services/auth/auth.service';
import { Controller, Post, Body, Query, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from '../../services/auth/Dto/signUpDto';
import { HttpResponse } from '../../data/Dtos/http.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(
    @Body() model: SignUpDto,
  ): Promise<HttpResponse<{ token: string }>> {
    return await this.authService.signUp(model);
  }

  @Post('/login')
  async login(
    @Body() model: LoginDto,
  ): Promise<HttpResponse<{ token: string }>> {
    return await this.authService.login(model);
  }

  @Post('/reset-password')
  async resetPassword(@Body() model: ResetPasswordDto): Promise<void> {
    await this.authService.resetPasswordAsync(model);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() email: string): Promise<void> {
    await this.authService.forgotPasswordAsync(email);
  }

  @Get('/verify-email')
  async verifyEmail(@Query() email: string): Promise<void> {
    await this.authService.verifyEmailAsync(email);
  }

  @Patch('/update')
  async changeUser(@Body() model: any): Promise<void> {
    await this.authService.updateAsync(model);
  }
}

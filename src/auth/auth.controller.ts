import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthCredentialDto } from '../dto/auth-credentials-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/signup')
  singUp(@Body() credential: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(credential);
  }

  @Post('/signin')
  signIn(@Body() credential: AuthCredentialDto): Promise<string> {
    return this.authService.signIn(credential);
  }

}

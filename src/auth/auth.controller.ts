import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthCredentialDto } from '../dto/auth-credentials-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/singup')
  singUp(@Body() credential: AuthCredentialDto) {
    return this.authService.singUp(credential);
  }
  
}

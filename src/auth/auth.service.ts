import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRespository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from '../dto/auth-credentials-dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/dto/jwt-pay.interface';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRespository)
    private UserRespository: UserRespository,
    private jwtService: JwtService
  ) { }

  async signUp(credentials: AuthCredentialDto): Promise<void> {
    await this.UserRespository.createUser(credentials);
  }

  async signIn(credentials: AuthCredentialDto): Promise<{token:string}> {
    const { username, password } = credentials;
    const user = await this.UserRespository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload:JwtPayload = {username}
      const token = await this.jwtService.signAsync(payload);
      return {token}
    }

    throw new UnauthorizedException('Pleas check your login credentials');
  }
}

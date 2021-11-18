import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRespository } from './users.repository';
import { JwtPayload } from '../dto/jwt-pay.interface';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private userRespository:UserRespository,
    private configService: ConfigService
  ){
    super({
      secretOrKey:configService.get('JWT_SECRET'),
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(JwtPayload:JwtPayload):Promise<User>{
    const {username} = JwtPayload;
    const user:User = await this.userRespository.findOne({username});

    if(!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}
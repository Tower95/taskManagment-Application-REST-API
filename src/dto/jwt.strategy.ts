import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRespository } from '../auth/users.repository';
import { JwtPayload } from '../dto/jwt-pay.interface';
import { User } from '../auth/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private userRespository:UserRespository
  ){
    super({
      secretOrKey:'topsecret51',
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
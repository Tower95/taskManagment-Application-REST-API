import { Injectable } from '@nestjs/common';
import { UserRespository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from '../dto/auth-credentials-dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRespository)
    private UserRespository:UserRespository
  ){}

  async singUp(credentials: AuthCredentialDto):Promise<void>{
    await this.UserRespository.createUser(credentials);
  }
}

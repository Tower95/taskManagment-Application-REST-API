import { Injectable } from '@nestjs/common';
import { UserRespository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRespository)
    private UserRespository:UserRespository
  ){}
}

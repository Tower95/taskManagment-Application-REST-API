import { EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';
import { AuthCredentialDto } from '../dto/auth-credentials-dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRespository extends Repository<User>{

  async createUser(credential: AuthCredentialDto): Promise<void> {
    const { username, password } = credential;
    let encrptPassword = await this.encrypt(password);

    const user = this.create({
      username,
      password:encrptPassword
    });

    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return;
  }

  async encrypt(data:any){
    const salt = await bcrypt.genSalt();
    const hashedData = await bcrypt.hash(data,salt)
    return hashedData;
  }

}
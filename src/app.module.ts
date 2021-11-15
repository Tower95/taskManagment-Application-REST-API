import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
//import typeorm after isntall it and the nestjs package and pg
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TaskModule,
    //here we add the TypeOrm for conection as a forRoot with the patterm singleton.
    TypeOrmModule.forRoot({
      type:'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management', 
      autoLoadEntities: true,
      synchronize: true,
    })
  ]
})
export class AppModule { }
 
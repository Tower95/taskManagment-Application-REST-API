import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
//import typeorm after isntall it and the nestjs package and pg
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema:configValidationSchema
    }),
TaskModule,
  //here we add the TypeOrm for conection as a forRoot with the patterm singleton.
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService], 
    useFactory: async (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get(`DB_HOST`),
        port: configService.get(`DB_PORT`),
        username: configService.get(`DB_USERNAME`),
        password: configService.get(`DB_PASSWORD`),
        database: configService.get(`DB_DATABASE`),
        autoLoadEntities: true,
        synchronize: true,
      }
    }
    // type: 'postgres',
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    // autoLoadEntities: true,
    // synchronize: true,
  }),
  AuthModule
  ]
})
export class AppModule { }

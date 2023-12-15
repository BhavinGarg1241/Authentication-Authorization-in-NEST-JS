import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userRolesEntity } from './entities/userRoles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([userRolesEntity]),
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.jwtSecretKey,
      signOptions: { expiresIn: '3600s' }
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }

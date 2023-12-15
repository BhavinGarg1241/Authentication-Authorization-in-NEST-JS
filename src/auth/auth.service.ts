import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userRolesEntity } from './entities/userRoles.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private JwtService: JwtService,
        @InjectRepository(userRolesEntity)
        private userRolesRepository: Repository<userRolesEntity>,
    ) { }

    async register(email: string, password: string) {
        try {
            const existingUser = await this.userService.findUser(email);
            if (existingUser) {
                throw new ConflictException('User with the same username already exists.');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.userService.createUser(email, hashedPassword);
            const userRole = this.userRolesRepository.create({userId:newUser.id,roleId:2})
            await this.userRolesRepository.save(userRole);
            return await this.signIn(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(email: string, pass: string) {
        try {
            const user = await this.userService.findUser(email);
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }
            if (await bcrypt.compare(pass, user.password)) {
                const { password, ...result } = user;
                const role = await this.userRolesRepository.findOne({where:{userId: user.id}});
                console.log(role);
                const token = this.JwtService.sign({ sub: user.id, email: user.email,roles:role.roleId });
                return { ...result, token };
            }
            else {
                throw new UnauthorizedException('Invalid credentials');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

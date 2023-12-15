import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
    ) { }

    async createUser(email: string, password: string) {
        try {
            const newUser = this.userRepository.create({ email, password });
            const user = await this.userRepository.save(newUser);
            return user;
        } catch (error) {
            console.log(error);;
        }
    }

    async findUser(email: string) {
        try {
            return await this.userRepository.findOneBy({ email });
        } catch (error) {
            console.log(error);
        }
    }
}

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../customDecorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService){}

    @UseGuards(AuthGuard,RolesGuard)
    @Roles(2)
    @Get('profile')
    async getProfile(@Request() req:any){
        return req.user;
    }
}

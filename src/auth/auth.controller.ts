import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body('email') email: string, @Body('password') password: string) {
        try {
            return await this.authService.register(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        try {
            return await this.authService.signIn(email, password);
        } catch (error) {
            console.log(error);
        }
    }
}

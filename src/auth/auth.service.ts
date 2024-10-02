
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/user/hash.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private hashService: HashService,
        private jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByUsername(email);
        if (user && (await this.hashService.comparePassword(pass, user.password))) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            username: user.email,
            sub: user.id
        };
        return {
            success: true,
            message: "Login Successful",
            access_token: this.jwtService.sign(payload),
        };
    }
}
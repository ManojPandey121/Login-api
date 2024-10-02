import { AuthService } from 'src/auth/auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        console.log(13, username, password)
        const user = await this.authService.validateUser(username, password);
        console.log(15, user)
        if (!user) {
            throw new UnauthorizedException({
                message: "You have entered a wrong username or password"
            });
        }
        return user;
    }
}
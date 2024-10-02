import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { User, UserSchema } from 'src/user/user.schema';
import { jwtConstants } from 'src/constants';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/user/hash.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '60d'
            },
        }),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
          }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, HashService],
})
export class AuthModule { }
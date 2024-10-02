import { HttpService } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { Controller, Request, UseGuards, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly httpService: HttpService) { }
    @UseGuards(AuthGuard('local'))
    @Post(`/login`)
    async login(@Request() req, @Body() userBody: any) {
        console.log(11, userBody);
        const { captchaValue } = userBody;
        if(!captchaValue){
            throw new BadRequestException('Invalid-Captcha')
        }
        const response = await this.httpService.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SITE_SECRET}&response=${captchaValue}`,
          )
          console.log('21, data==>>', response)
        return this.authService.login(req.user);
    }
}
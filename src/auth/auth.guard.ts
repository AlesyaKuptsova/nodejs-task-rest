import { UnauthorizedException , CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Maybe } from "../common/util";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;
        const validAuth = await this.checkAuth(authorization);
        if(!validAuth) {
            throw new UnauthorizedException();
        }
        return true;
    }

    private async checkAuth(auth: Maybe<string>): Promise<boolean>{
        if(!auth) {
            return false;
        }
        const token = auth.split(' ')[1];
        if(!token) {
            return false;
        }
        return this.authService.checkToken(token);
    }
}
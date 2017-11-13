import { Injectable, Inject } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../services/auth.service';
import { IAuthConfig } from '../auth.config';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, @Inject('authConfig') public authConfig: IAuthConfig) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
        console.log('redirect to0');   
        if(this.authService.isAuthorized) {
            return true;
        }

        console.log('redirect to');

        this.router.navigate(
            this.authConfig.loginRoute,
            {
                queryParams: { returnUrl: state.url }
            }
        );
        return false;
    }
}
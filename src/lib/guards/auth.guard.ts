import { Injectable, Inject } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { JwtHelper } from 'angular2-jwt';
import { AuthenticationService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router, @Inject('fallbackUrl') public fallbackUrl: string) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
        if(this.authService.isAuthenticated) {
            return true;
        }

        this.router.navigateByUrl(
            this.fallbackUrl,
            { queryParams: { returnUrl: state.url } }
        );
        return false;
    }
}
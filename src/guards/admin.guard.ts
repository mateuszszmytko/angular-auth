import { Injectable, Inject } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { CurrentUserService } from '../services/current-user.service';
import { IAuthConfig } from '../auth.config';


@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private _currentUser: CurrentUserService, private router: Router, @Inject('authConfig') public authConfig: IAuthConfig) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {          
        console.log(this._currentUser.userData, this._currentUser.isAdmin);
        if(this._currentUser.isAdmin) {
            return true;
        }

        if(this._currentUser.isLogged) {
            this.router.navigate(['/']);
            return false;
        }

        this.router.navigate(
            this.authConfig.loginRoute,
            {
                queryParams: { returnUrl: state.url }
            }
        );
        return false;
    }
}
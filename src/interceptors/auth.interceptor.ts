import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from '../services/auth.service';


 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth: AuthService = this.injector.get(AuthService);

    if(!auth.isAuthorized) {
      return next.handle(req);
    }

    const authHeader = auth.authHeader;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authHeader)
    });

    return next.handle(authReq)
      .catch((err: any, caught) => {
        // navigate to home after 401
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
          return Observable.throw(err);
        }
      });
  }
}
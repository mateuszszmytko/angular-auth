import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthenticationService } from '../services';


 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth: AuthenticationService = this.injector.get(AuthenticationService);

    if(!auth.isAuthenticated) {
      return next.handle(req);
    }

    const authHeader = auth.authHeader;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authHeader)
    });

    return next.handle(authReq);
  }
}
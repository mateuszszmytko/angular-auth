import {Injectable, Inject} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { IAuthConfig } from '../auth.config';
 
@Injectable()
export class ContentInterceptor implements HttpInterceptor {
  constructor( @Inject('AuthConfig') private _authConfig: IAuthConfig) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.has('Content-type')) {
      return next.handle(req);
    }
    const Req = req.clone({headers: req.headers.set('Content-Type', this._authConfig.contentType)});

    return next.handle(Req);
  }
}
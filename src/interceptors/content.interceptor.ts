import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class ContentInterceptor implements HttpInterceptor {
  constructor() {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.has('Content-type')) {
      return next.handle(req);
    }
    const Req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});

    return next.handle(Req);
  }
}
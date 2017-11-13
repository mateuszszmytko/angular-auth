import { Injectable, Inject } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

import { ITokenResult, IDecodedToken } from '../interfaces';


export abstract class TokenStorageServiceGeneric<T> {
    abstract get token(): string;
    abstract set token(v: string);
    abstract getDecodedToken<TD extends T>(): T;
    abstract clear();
}

export abstract class TokenStorageService 
                    extends TokenStorageServiceGeneric<IDecodedToken>{ }

@Injectable()
export class TokenStorage implements TokenStorageService {    
    private jwtHelper: JwtHelper = new JwtHelper();

    public get token(): string {
        let tokenStorage = localStorage.getItem('currentUser');
        
        if(tokenStorage == null)
            return null;

        if(this.jwtHelper.isTokenExpired(tokenStorage))
            return null;
            
        return tokenStorage;
    }

    public set token(v: string) {
        localStorage.setItem('currentUser', v);
    }

    public getDecodedToken<T extends IDecodedToken>(): T
     {
        const decodedToken: T = this.jwtHelper.decodeToken(this.token);
        return decodedToken;
    }

    constructor() { }

    public clear(): void {
        localStorage.removeItem('currentUser');
    }

}


import { Injectable, Inject } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';



export enum TokenStatus {
    None,
    Null,
    Invalid,
    Expired,
    Valid
}

@Injectable()
export class TokenStorageService {    
	private jwtHelper: JwtHelper = new JwtHelper();
	
	public get token(): string {
        return localStorage.getItem('currentUser');;
    }

    public set token(v: string) {
        localStorage.setItem('currentUser', v);
	}

	public get isTokenExpired(): boolean {
		try {
            return this.jwtHelper.isTokenExpired(this.token);
        } catch {
            return true;
        }
	}

	public get isValidToken(): boolean {
		try {
            this.jwtHelper.decodeToken(this.token)
            return true;
        } catch {
            return false;
        }
    }
    
    public get tokenStatus(): TokenStatus {
        if(this.token == null) return TokenStatus.Null;
        if(!this.isValidToken) return TokenStatus.Invalid;
        if(this.isTokenExpired) return TokenStatus.Expired;

        return TokenStatus.Valid;
    }    
	
	constructor() { }

    public getDecodedToken<T>(): T
     {
        const decodedToken: T = this.jwtHelper.decodeToken(this.token);
        return decodedToken;
    }

    public clear(): void {
        localStorage.removeItem('currentUser');
    }

}


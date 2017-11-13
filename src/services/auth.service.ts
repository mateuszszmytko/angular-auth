import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

import { User, LoginData, RegisterData } from '../models';
import { ITokenResult, IDecodedToken} from '../interfaces';

import { TokenStorageService } from './token-storage.service';
import { IAuthConfig } from '../auth.config';




export abstract class AuthService {
    abstract get isAuthorized(): boolean;
    abstract get authHeader(): string;
    abstract authorize(loginModel: LoginData): Promise<void>;
    abstract createAndAuthorize(registerModel: RegisterData): Promise<void>;
}

@Injectable()
export class Auth implements AuthService {
    public get isAuthorized(): boolean { return this._tokenStorage.token != null; }
    public get authHeader(): string { return `bearer ${this._tokenStorage.token}`;  }

    constructor(private _http: HttpClient,
                @Inject('authConfig') public authConfig: IAuthConfig,
                private _tokenStorage: TokenStorageService) {  }


    public async authorize(loginModel: LoginData): Promise<void> {
        const tokenResult: ITokenResult = await this._http.post<ITokenResult>
            (this.authConfig.apiEndpoint+this.authConfig.apiTokenPath, JSON.stringify(loginModel))
            .toPromise(); 

        this._tokenStorage.token = tokenResult.token;
    }

    public async createAndAuthorize(registerModel: RegisterData): Promise<void> {
        const tokenResult: ITokenResult = await this._http.post<ITokenResult>
            (this.authConfig.apiEndpoint+this.authConfig.apiRegisterPath, JSON.stringify(registerModel))
            .toPromise(); 

        this._tokenStorage.token = tokenResult.token;
    }
}

export class FakeAuth implements AuthService {
    public get isAuthorized(): boolean { return this._tokenStorage.token != null; }
    public get authHeader(): string { return `bearer ${this._tokenStorage.token}`;  }

    constructor(@Inject('authConfig') public authConfig: IAuthConfig,
                private _tokenStorage: TokenStorageService) {

    }
    async authorize(loginModel: LoginData): Promise<void> {
        if(loginModel.username != 'test' || loginModel.password != 'test') {
            throw new Error("Unauthorized.");
        }
        this._tokenStorage.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OWYzYmY4MDk0MWUyMjA0ZDg2ZTY3N2EiLCJqdGkiOiJlZDMzYTc0OC03M2IyLTRjOTQtYjhhYy1jYzczZDBlOTY2ZDgiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJUZXN0Iiwicm9sZXMiOlsiQURNSU4iLCJVU0VSIl0sImV4cCI6MTU0MjEwNzM5MSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MjIxNyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTIyMTcifQ.nYOUzDSlDH_v6JZOdZSZ64SPsRMaP8-t_f8FeofGzG0";
        
    }
    async createAndAuthorize(registerModel: RegisterData): Promise<void> {
        await this.authorize(registerModel);
    }
    
}
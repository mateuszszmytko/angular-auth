import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ITokenResult, 
		IDecodedToken } from '../interfaces';
import { RegisterData, LoginData, User } from '../models';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';


export abstract class CurrentUserServiceGeneric<TUser extends User> {
	abstract get isLogged(): boolean;
	abstract get isAdmin(): boolean;
	abstract get userData(): TUser;
	abstract get userObserver(): Subject<TUser>;

	abstract async login(model: LoginData): Promise<boolean>;
	abstract async register(model: RegisterData): Promise<boolean>;
	abstract logout(): void;
	abstract decodeUser(): void;
}

export abstract class CurrentUserService extends CurrentUserServiceGeneric<User> { }

@Injectable()
export class CurrentUser implements CurrentUserService {    
	
	public get isLogged(): boolean { return !!this._tokenStorageService.token; }
	public get isAdmin(): boolean { return this.userData.roles && this.userData.roles.indexOf("ADMIN") >= 0; }
	public get userData(): User { return this._userData; }
	public get userObserver(): Subject<User> { return this._userEmmiter;}

	private _userData: User = new User();
	private _userEmmiter: Subject<User> = new Subject<User>();

	constructor(private _tokenStorageService: TokenStorageService,
				private _auth: AuthService) {

		if(this._auth.isAuthorized) {
			this.decodeUser();
		}
	}

	public async login(model: LoginData): Promise<boolean> {
		await this._auth.authorize(model);
		
		this.decodeUser();
		this._userEmmiter.next(this._userData);
        return true;
	}

	public async register(model: RegisterData): Promise<boolean> {
		await this._auth.createAndAuthorize(model);
		
		this.decodeUser();
		this._userEmmiter.next(this._userData);
        return true;
	}

	public logout(): void {
		this._tokenStorageService.clear();
		this._userData = null;
		
		this._userEmmiter.next(this._userData);
	}

	public decodeUser(): void {
		const decodedToken: IDecodedToken = this._tokenStorageService.getDecodedToken();
		this._userData = new User();

		this._userData.email = decodedToken.email;
		this._userData.username = decodedToken.unique_name;
		this._userData.id = decodedToken.sub;
		this._userData.roles = typeof decodedToken.roles === 'string'? [decodedToken.roles]: decodedToken.roles;
	}
}




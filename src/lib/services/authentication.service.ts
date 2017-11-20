import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { AuthenticationModel } from "../models";
import { TokenStorageService, TokenStatus } from "./token-storage.service";
import { of } from "rxjs/observable/of";

export enum AuthenticateResponseStatus {
	None,
	Unauthorized,
	Failure,
	Success
}

export interface IAuthenticationServiceConstructor {
	new (...vals: Array<any>): AuthenticationService;
}


@Injectable()
export abstract class AuthenticationService {
	public get isAuthenticated(): boolean { return this._tokenStorage.tokenStatus == TokenStatus.Valid }
    public get authHeader(): string { return `bearer ${this._tokenStorage.token}`;  }

	constructor(protected _http: HttpClient,
		protected _tokenStorage: TokenStorageService) {  }
	
	protected abstract sendTokenRequest(authenticationModel: any): Observable<string>;

	public authenticate<TModel>(authenticationModel: TModel): Observable<AuthenticateResponseStatus> {
		return new Observable((handler) => {
			this.sendTokenRequest(authenticationModel).subscribe(
				(response) => {
					this._tokenStorage.token = response;
					handler.next(AuthenticateResponseStatus.Success)
					handler.complete();
				},
				(error) => {
					if (error instanceof HttpErrorResponse && error.status === 401) {
						handler.next(AuthenticateResponseStatus.Unauthorized)
					} else {
						handler.next(AuthenticateResponseStatus.Failure)
					}
					handler.complete();
					
				}
			);

			
		});
			
			
	}

	authenticateAsync<TModel>(authenticationModel: TModel): Promise<AuthenticateResponseStatus> {
		return this.authenticate(authenticationModel)
			.toPromise();
	}
	
}

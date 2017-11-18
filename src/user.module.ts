import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {  HttpClientModule, HttpClient } from '@angular/common/http';


import { TokenStorageService, AuthenticationService, testAuthService } from './lib/services';

export interface UserModuleConfig {
	authenticationService: IAuthenticationServiceConstructor;
}

interface IAuthenticationServiceConstructor {
    new (_http: HttpClient, _tokenStorage: TokenStorageService): AuthenticationService;
}

@NgModule({
	imports: [HttpClientModule,],
	providers: [
		{ provide: TokenStorageService, useClass: TokenStorageService},		
	]
})
export class UserModule {
	constructor (@Optional() @SkipSelf() parentModule: UserModule) {
		if (parentModule) {
		  throw new Error(
			'UserModule is already loaded. Import it in the AppModule/CoreModule only');
		}
		UserModule.forRoot({
			authenticationService: testAuthService
		})
	}

	static forRoot(config: UserModuleConfig): ModuleWithProviders {
		return {
			ngModule: UserModule,
			providers: [
			  {provide: AuthenticationService, useClass: config.authenticationService }
			]
		};
	}

}

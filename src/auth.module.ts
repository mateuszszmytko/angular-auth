import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {  HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


import { TokenStorageService, 
	AuthenticationService, IAuthenticationServiceConstructor } from './lib/services';
import { IAuthModuleConfig } from './lib/interfaces';
import { AuthInterceptor } from './lib/interceptors/auth.interceptor';



@NgModule({
	imports: [HttpClientModule],
	providers: [
		{ provide: TokenStorageService, useClass: TokenStorageService},		
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	]
})
export class AuthModule {
	constructor (@Optional() @SkipSelf() parentModule: AuthModule) {
		if (parentModule) {
		  throw new Error(
			'AuthModule is already loaded. Import it in the AppModule/CoreModule only.');
		}
		if(!AuthModule.isConfigured) {
			throw new Error(
				'AuthModule is not configured.');
		}

	}
	static isConfigured:boolean = false;

	static configure(config: IAuthModuleConfig): ModuleWithProviders {
		AuthModule.isConfigured = true;
		return {
			ngModule: AuthModule,
			providers: [
			  {provide: AuthenticationService, useClass: config.authenticationService },
			  {provide: 'fallbackUrl', useValue: config.fallbackPageUrl}
			]
		};
	}

}

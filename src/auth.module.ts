import { NgModule, Optional, SkipSelf } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';

import { AuthGuard, AdminGuard } from './guards';
import { IAuthConfig } from './auth.config';
import { AuthService, Auth,
	CurrentUser, CurrentUserService,
	TokenStorage, TokenStorageService } from './services';
import { SharedAuthModule } from './shared-auth.module';


export const defaultAuthConfig: IAuthConfig = {
	apiEndpoint: 'http://localhost:52217/api',
	apiTokenPath: '/auth/token',
	apiRegisterPath: '/auth/register',
	loginRoute: ['account', 'login'],
	registerRoute: ['account', 'register']
};

@NgModule({
	imports: [HttpClientModule],
	providers: [
		AuthGuard, AdminGuard,
		{ provide: 'authConfig', useValue: defaultAuthConfig },	
		{ provide: TokenStorageService, useClass: TokenStorage},
		{ provide: AuthService, useClass: Auth},
		{ provide: CurrentUserService, useClass: CurrentUser},
		
	]
})
export class AuthModule {
	constructor (@Optional() @SkipSelf() parentModule: AuthModule) {
		if (parentModule) {
		  throw new Error(
			'AuthModule is already loaded. Import it in the AppModule/CoreModule only');
		}
	  }
}

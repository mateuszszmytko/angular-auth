import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { AuthenticationService, TokenStorageService } from "./lib/services";
import { AuthInterceptor } from "./lib/interceptors/auth.interceptor";
import { HttpClient } from "@angular/common/http";
import { AuthModule } from "./auth.module";

const responseToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OWYzYmY4MDk0MWUyMjA0ZDg2ZTY3N2EiLCJqdGkiOiI1MDA2ZWNkZC1kNzkwLTQyMzUtOTliMy01YmI0MTA4OTRlNGQiLCJlbWFpbCI6InJhYUBnbWFpbC5wbCIsInVuaXF1ZV9uYW1lIjoiUmFhMSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJleHAiOjE1NDA3Mjg0NDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTIyMTciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyMjE3In0.meh1gEg8qmzjtzQUsS0LqB-mP4By0PmlRa2WYQjWcow";

class TestAuthenticationModel {
	username: string;
	password: string;
}

@Injectable()
class TestAuthenticationService extends AuthenticationService {
	protected sendTokenRequest(authenticationModel: TestAuthenticationModel): Observable<string> {
		return new Observable(handler => {
			if(authenticationModel.username != 'test' || authenticationModel.password != 'test')
				handler.error(new HttpErrorResponse({status: 401}));

			handler.next(responseToken)
			handler.complete();
		});
	}
	
}

describe('AuthModule', () => {
	let authService: TestAuthenticationService;
	let httpMock: HttpTestingController;
	let http: HttpClient;
	let testBed: typeof TestBed;
  
	beforeEach(() => {
		
	});

	it('should be created',  () => {
		testBed = TestBed.configureTestingModule({
			imports: [
		  		HttpClientTestingModule, AuthModule.configure({
				 	authenticationService: TestAuthenticationService,
				 	fallbackPageUrl: '/'
				})
			],
			providers: [

			]
	  	});
  
	  	authService = TestBed.get(AuthenticationService);

		expect(testBed).toBeTruthy();
	});

	it('should throw error',  () => {
		try {
			testBed = TestBed.configureTestingModule({
				imports: [
					  HttpClientTestingModule, AuthModule
				],
				providers: [
	
				]
			});
	  
			authService = TestBed.get(AuthenticationService);
	
			expect(false).toBeTruthy();
		} catch(e) {
			expect(true).toBeTruthy();
		}
	});

  
});

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { AuthenticationService, TokenStorageService } from "../services";
import { AuthInterceptor } from "./auth.interceptor";
import { HttpClient } from "@angular/common/http";

const responseToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OWYzYmY4MDk0MWUyMjA0ZDg2ZTY3N2EiLCJqdGkiOiI1MDA2ZWNkZC1kNzkwLTQyMzUtOTliMy01YmI0MTA4OTRlNGQiLCJlbWFpbCI6InJhYUBnbWFpbC5wbCIsInVuaXF1ZV9uYW1lIjoiUmFhMSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJleHAiOjE1NDA3Mjg0NDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTIyMTciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyMjE3In0.meh1gEg8qmzjtzQUsS0LqB-mP4By0PmlRa2WYQjWcow";
const testUrl = "test_url";


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

describe('AuthInterceptor', () => {
	let authService: TestAuthenticationService;
	let httpMock: HttpTestingController;
	let http: HttpClient;
  
	beforeEach(() => {
	  TestBed.configureTestingModule({
		imports: [
		  HttpClientTestingModule
		],
		providers: [
			TokenStorageService,
			{
				provide: HTTP_INTERCEPTORS,
				useClass: AuthInterceptor,
				multi: true,
			},
			{provide: AuthenticationService, useClass: TestAuthenticationService },
		]
	  });
  
	  authService = TestBed.get(AuthenticationService);
	  httpMock = TestBed.get(HttpTestingController);
	  http = TestBed.get(HttpClient);

	  window.localStorage.removeItem('currentUser');
	});

	it('should not contains the authorization header', () => {
		http.get(testUrl).subscribe(data => {
		  expect(data['name']).toEqual('Test_Data');
		}, fail);
  
		const req = httpMock.expectOne(testUrl);
  
		expect(req.request.url).toBe(testUrl);
		console.log(req.request.headers);
		expect(req.request.headers.has('Authorization')).toBe(false);
		req.flush({name: 'Test_Data'});
	});

	it('should contains the authorization header', async (done) => {
		let user = new TestAuthenticationModel();
		user.username = 'test';
		user.password = 'test';

		await authService.authenticateAsync(user);

		http.get(testUrl).subscribe(data => {
		  expect(data['name']).toEqual('TestData');
		}, fail);
  
		const req = httpMock.expectOne(testUrl);
  
		expect(req.request.url).toBe(testUrl);
		expect(req.request.headers.has('Authorization')).toBe(true);
		req.flush({name: 'TestData'});

		done();
	});
  
});
import { TestBed, inject } from '@angular/core/testing';
import {
	HttpClientTestingModule,
	HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TokenStorageService } from './token-storage.service';
import { AuthenticationService, AuthenticateResponseStatus } from './authentication.service';




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

describe('AuthenticationService', () => {
	let service: AuthenticationService;
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				TokenStorageService,
				{provide: AuthenticationService, useClass: TestAuthenticationService },
				
			]
		});

		window.localStorage.removeItem('currentUser');
		service = TestBed.get(AuthenticationService);
	});

	it('should be created',  () => {
		expect(service).toBeTruthy();
	});

	it('should authenticate', () => {
		let testUser = new TestAuthenticationModel();
		testUser.username = 'test';
		testUser.password = 'test';

		service.authenticate(testUser).subscribe(result => {
			expect(result).toBe(AuthenticateResponseStatus.Success)
			expect(service.isAuthenticated).toBe(true)
		});
	});

	it('should not authenticate', () => {
		let testUser = new TestAuthenticationModel();
		testUser.username = 'test';
		testUser.password = 'test2';

		service.authenticate(testUser).subscribe(result => {
			expect(result).toBe(AuthenticateResponseStatus.Unauthorized)
			expect(service.isAuthenticated).toBe(false)
		});
		
	});

	it('should authenticate (async)', async (done) => {
		let testUser = new TestAuthenticationModel();
		testUser.username = 'test';
		testUser.password = 'test';

		let status = await service.authenticateAsync(testUser)
		expect(status).toBe(AuthenticateResponseStatus.Success);
		expect(service.isAuthenticated).toBe(true);

		done();
	});

	it('should not authenticate (async)', async (done) => {
		let testUser = new TestAuthenticationModel();
		testUser.username = 'test';
		testUser.password = 'test2';

		let status = await service.authenticateAsync(testUser)
		expect(status).toBe(AuthenticateResponseStatus.Unauthorized);
		expect(service.isAuthenticated).toBe(false);

		done();
	});
});

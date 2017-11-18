import { TestBed, inject } from '@angular/core/testing';
import {
	HttpClientTestingModule,
	HttpTestingController
} from '@angular/common/http/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TokenStorageService, TokenStatus } from './token-storage.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const responseToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OWYzYmY4MDk0MWUyMjA0ZDg2ZTY3N2EiLCJqdGkiOiI1MDA2ZWNkZC1kNzkwLTQyMzUtOTliMy01YmI0MTA4OTRlNGQiLCJlbWFpbCI6InJhYUBnbWFpbC5wbCIsInVuaXF1ZV9uYW1lIjoiUmFhMSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJleHAiOjE1NDA3Mjg0NDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTIyMTciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyMjE3In0.meh1gEg8qmzjtzQUsS0LqB-mP4By0PmlRa2WYQjWcow";
const invalidResponseToken = "SOMETHING";
const expiredResponseToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OWYzYmY4MDk0MWUyMjA0ZDg2ZTY3N2EiLCJqdGkiOiI1MDA2ZWNkZC1kNzkwLTQyMzUtOTliMy01YmI0MTA4OTRlNGQiLCJlbWFpbCI6InJhYUBnbWFpbC5wbCIsInVuaXF1ZV9uYW1lIjoiUmFhMSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJleHAiOjE1MTA3Mjg0NDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTIyMTciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyMjE3In0.4YsScCWXalSQ7Rbn8pFe7hNJqa4yYf4xy6r_ECTEcL0";



describe('TokenStorageService', () => {
	let service: TokenStorageService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				TokenStorageService,				
			]
		});

		window.localStorage.removeItem('currentUser');
		service = TestBed.get(TokenStorageService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should handle undefined token', () => {
		expect(service.token).toBe(null);
		expect(service.isTokenExpired).toBe(true);
		expect(service.isValidToken).toBe(false);
		expect(service.tokenStatus).toBe(TokenStatus.Null);
	});

	it('should handle invalid token', () => {
		service.token = invalidResponseToken;
		
		expect(service.token).toBe(invalidResponseToken);
		expect(service.isTokenExpired).toBe(true);
		expect(service.isValidToken).toBe(false);
		expect(service.tokenStatus).toBe(TokenStatus.Invalid);
	});

	it('should handle expired token', () => {
		service.token = expiredResponseToken;
		
		expect(service.token).toBe(expiredResponseToken);
		expect(service.isTokenExpired).toBe(true);
		expect(service.isValidToken).toBe(true);
		expect(service.tokenStatus).toBe(TokenStatus.Expired);
	});

	it('should handle valid token', () => {
		service.token = responseToken;
		
		expect(service.token).toBe(responseToken);
		expect(service.isTokenExpired).toBe(false);
		expect(service.isValidToken).toBe(true);
		expect(service.tokenStatus).toBe(TokenStatus.Valid);
	});




});

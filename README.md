# angular-auth
Token based authentication module for Angular. 
Which contains
- services: `AuthenticationService`, `TokenStorageService`
- guards: `AuthGuard`
- interceptors: `AuthInterceptor`


## Installation
Install **@raa/angular-auth** via npm `npm install @raa/angular-auth --save-dev`.

## Usage
Import **AuthenticationService** abstract class to extends your AuthService.
```typescript
@Injectable()
class AuthService extends AuthenticationService {
	protected sendTokenRequest(authenticationModel: AuthenticationModel): Observable<string> {
		return _http.post('http://localhost:5584/api/token', JSON.stringify(authenticationModel))
			map(response => {
				return response.token;
			});
	}
	
}
```

Import configured **AuthModule** in your main/core module. 
```typescript
@NgModule({
	imports: [
		AuthModule.configure({
			authenticationService: AuthService,
			fallbackPageUrl: '/login'
		})
	],
	[...]
})
export class CoreModule { }
```


### Inject
```typescript
@Component({
    selector: 'nav-c',
    templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
    constructor(private _authService: AuthenticationService) { }
}
```


### Examples
//todo

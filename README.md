# angular-auth
Token based authentication module for Angular. 
Which contains
- services: `AuthService`, `CurrentUserService`, `TokenStorageService`
- guards: `AuthGuard`, `AdminGuard`
- components: `LoginFormComponent`, `RegisterFormComponent`
- interceptors: `AuthInterceptor`, `ContentInterceptor`


## Installation
Install **@Raa/angular-auth** via npm `npm install @Raa/angular-auth --save-dev`.

## Usage
Import **AuthModule** in your main/core module and **SharedAuthModule** in your main/shared module. 
```typescript
@NgModule({
	imports: [AuthModule],
	[...]
})
export class CoreModule { }

@NgModule({
	imports: [AuthSharedModule],
	[...]
})
export class SharedModule { }
```

### Define options
```typescript
export const myAuthConfig: IAuthConfig = {
	apiEndpoint: 'http://localhost:8080/api',
	apiTokenPath: '/auth/token',
	apiRegisterPath: '/auth/register',
	loginRoute: ['account', 'login'],
	registerRoute: ['account', 'register'],
	contentType: 'application/json'
};

@NgModule({
	imports: [AuthModule],
	providers: [
		{ provide: 'authConfig', useValue: myAuthConfig },	
	]
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
    constructor(private _currentUser: CurrentUserService) { }
}
```


### Examples
//todo
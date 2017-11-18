import { IAuthenticationServiceConstructor } from "../services";

export interface IAuthModuleConfig {
	authenticationService: IAuthenticationServiceConstructor;
	fallbackPageUrl: string;
}

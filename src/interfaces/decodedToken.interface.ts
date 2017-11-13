export interface IDecodedToken {
	unique_name: string;
	email: string;
	sub: string;
	exp: Number;
	roles: string | Array<string>;
}
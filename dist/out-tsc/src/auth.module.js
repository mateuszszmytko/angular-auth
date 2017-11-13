"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var guards_1 = require("./guards");
var services_1 = require("./services");
var shared_auth_module_1 = require("./shared-auth.module");
exports.defaultAuthConfig = {
    apiEndpoint: 'http://localhost:52217/api',
    apiTokenPath: '/auth/token',
    apiRegisterPath: '/auth/register',
    loginRoute: ['account', 'login'],
    registerRoute: ['account', 'register']
};
var AuthModule = (function () {
    function AuthModule(parentModule) {
        if (parentModule) {
            throw new Error('AuthModule is already loaded. Import it in the AppModule/CoreModule only');
        }
    }
    return AuthModule;
}());
AuthModule = __decorate([
    core_1.NgModule({
        imports: [shared_auth_module_1.SharedAuthModule],
        providers: [
            guards_1.AuthGuard, guards_1.AdminGuard,
            { provide: 'authConfig', useValue: exports.defaultAuthConfig },
            { provide: services_1.TokenStorageService, useClass: services_1.TokenStorage },
            { provide: services_1.AuthService, useClass: services_1.Auth },
            { provide: services_1.CurrentUserService, useClass: services_1.CurrentUser },
        ]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [AuthModule])
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
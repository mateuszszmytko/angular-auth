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
var router_1 = require("@angular/router");
var auth_service_1 = require("../services/auth.service");
var AuthGuard = (function () {
    function AuthGuard(authService, router, authConfig) {
        this.authService = authService;
        this.router = router;
        this.authConfig = authConfig;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        console.log('redirect to0');
        if (this.authService.isAuthorized) {
            return true;
        }
        console.log('redirect to');
        this.router.navigate(this.authConfig.loginRoute, {
            queryParams: { returnUrl: state.url }
        });
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject('authConfig')),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, Object])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map
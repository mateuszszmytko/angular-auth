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
var current_user_service_1 = require("../services/current-user.service");
var AdminGuard = (function () {
    function AdminGuard(_currentUser, router, authConfig) {
        this._currentUser = _currentUser;
        this.router = router;
        this.authConfig = authConfig;
    }
    AdminGuard.prototype.canActivate = function (route, state) {
        console.log(this._currentUser.userData, this._currentUser.isAdmin);
        if (this._currentUser.isAdmin) {
            return true;
        }
        if (this._currentUser.isLogged) {
            this.router.navigate(['/']);
            return false;
        }
        this.router.navigate(this.authConfig.loginRoute, {
            queryParams: { returnUrl: state.url }
        });
        return false;
    };
    return AdminGuard;
}());
AdminGuard = __decorate([
    core_1.Injectable(),
    __param(2, core_1.Inject('authConfig')),
    __metadata("design:paramtypes", [current_user_service_1.CurrentUserService, router_1.Router, Object])
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map
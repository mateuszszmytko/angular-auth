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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var auth_service_1 = require("../services/auth.service");
var AuthInterceptor = (function () {
    function AuthInterceptor(injector, router) {
        this.injector = injector;
        this.router = router;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var auth = this.injector.get(auth_service_1.AuthService);
        if (!auth.isAuthorized) {
            return next.handle(req);
        }
        var authHeader = auth.authHeader;
        var authReq = req.clone({
            headers: req.headers.set('Authorization', authHeader)
        });
        return next.handle(authReq)
            .catch(function (err, caught) {
            // navigate to home after 401
            if (err instanceof http_1.HttpErrorResponse) {
                if (err.status === 401) {
                    _this.router.navigate(['/']);
                }
                return Observable_1.Observable.throw(err);
            }
        });
    };
    return AuthInterceptor;
}());
AuthInterceptor = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Injector, router_1.Router])
], AuthInterceptor);
exports.AuthInterceptor = AuthInterceptor;
//# sourceMappingURL=auth.interceptor.js.map
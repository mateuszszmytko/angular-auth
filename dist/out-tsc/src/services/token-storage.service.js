"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var angular2_jwt_1 = require("angular2-jwt");
var TokenStorageServiceGeneric = (function () {
    function TokenStorageServiceGeneric() {
    }
    return TokenStorageServiceGeneric;
}());
exports.TokenStorageServiceGeneric = TokenStorageServiceGeneric;
var TokenStorageService = (function (_super) {
    __extends(TokenStorageService, _super);
    function TokenStorageService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TokenStorageService;
}(TokenStorageServiceGeneric));
exports.TokenStorageService = TokenStorageService;
var TokenStorage = (function () {
    function TokenStorage() {
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    Object.defineProperty(TokenStorage.prototype, "token", {
        get: function () {
            var tokenStorage = localStorage.getItem('currentUser');
            if (tokenStorage == null)
                return null;
            if (this.jwtHelper.isTokenExpired(tokenStorage))
                return null;
            return tokenStorage;
        },
        set: function (v) {
            localStorage.setItem('currentUser', v);
        },
        enumerable: true,
        configurable: true
    });
    TokenStorage.prototype.getDecodedToken = function () {
        var decodedToken = this.jwtHelper.decodeToken(this.token);
        return decodedToken;
    };
    TokenStorage.prototype.clear = function () {
        localStorage.removeItem('currentUser');
    };
    return TokenStorage;
}());
TokenStorage = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], TokenStorage);
exports.TokenStorage = TokenStorage;
//# sourceMappingURL=token-storage.service.js.map
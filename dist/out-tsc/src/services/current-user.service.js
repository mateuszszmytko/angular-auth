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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var models_1 = require("../models");
var auth_service_1 = require("./auth.service");
var token_storage_service_1 = require("./token-storage.service");
var CurrentUserServiceGeneric = (function () {
    function CurrentUserServiceGeneric() {
    }
    return CurrentUserServiceGeneric;
}());
exports.CurrentUserServiceGeneric = CurrentUserServiceGeneric;
var CurrentUserService = (function (_super) {
    __extends(CurrentUserService, _super);
    function CurrentUserService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CurrentUserService;
}(CurrentUserServiceGeneric));
exports.CurrentUserService = CurrentUserService;
var CurrentUser = (function () {
    function CurrentUser(_tokenStorageService, _auth) {
        this._tokenStorageService = _tokenStorageService;
        this._auth = _auth;
        this._userData = new models_1.User();
        this._userEmmiter = new Subject_1.Subject();
        if (this._auth.isAuthorized) {
            this.decodeUser();
        }
    }
    Object.defineProperty(CurrentUser.prototype, "isLogged", {
        get: function () { return !!this._tokenStorageService.token; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurrentUser.prototype, "isAdmin", {
        get: function () { return this.userData.roles && this.userData.roles.indexOf("ADMIN") >= 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurrentUser.prototype, "userData", {
        get: function () { return this._userData; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurrentUser.prototype, "userObserver", {
        get: function () { return this._userEmmiter; },
        enumerable: true,
        configurable: true
    });
    CurrentUser.prototype.login = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._auth.authorize(model)];
                    case 1:
                        _a.sent();
                        this.decodeUser();
                        this._userEmmiter.next(this._userData);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    CurrentUser.prototype.register = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._auth.createAndAuthorize(model)];
                    case 1:
                        _a.sent();
                        this.decodeUser();
                        this._userEmmiter.next(this._userData);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    CurrentUser.prototype.logout = function () {
        this._tokenStorageService.clear();
        this._userData = null;
        this._userEmmiter.next(this._userData);
    };
    CurrentUser.prototype.decodeUser = function () {
        var decodedToken = this._tokenStorageService.getDecodedToken();
        this._userData = new models_1.User();
        this._userData.email = decodedToken.email;
        this._userData.username = decodedToken.unique_name;
        this._userData.id = decodedToken.sub;
        this._userData.roles = typeof decodedToken.roles === 'string' ? [decodedToken.roles] : decodedToken.roles;
    };
    return CurrentUser;
}());
CurrentUser = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [token_storage_service_1.TokenStorageService,
        auth_service_1.AuthService])
], CurrentUser);
exports.CurrentUser = CurrentUser;
//# sourceMappingURL=current-user.service.js.map
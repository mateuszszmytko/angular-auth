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
var http_1 = require("@angular/common/http");
var token_storage_service_1 = require("./token-storage.service");
var AuthService = (function () {
    function AuthService() {
    }
    return AuthService;
}());
exports.AuthService = AuthService;
var Auth = (function () {
    function Auth(_http, authConfig, _tokenStorage) {
        this._http = _http;
        this.authConfig = authConfig;
        this._tokenStorage = _tokenStorage;
    }
    Object.defineProperty(Auth.prototype, "isAuthorized", {
        get: function () { return this._tokenStorage.token != null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Auth.prototype, "authHeader", {
        get: function () { return "bearer " + this._tokenStorage.token; },
        enumerable: true,
        configurable: true
    });
    Auth.prototype.authorize = function (loginModel) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._http.post(this.authConfig.apiEndpoint + this.authConfig.apiTokenPath, JSON.stringify(loginModel))
                            .toPromise()];
                    case 1:
                        tokenResult = _a.sent();
                        this._tokenStorage.token = tokenResult.token;
                        return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.createAndAuthorize = function (registerModel) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._http.post(this.authConfig.apiEndpoint + this.authConfig.apiRegisterPath, JSON.stringify(registerModel))
                            .toPromise()];
                    case 1:
                        tokenResult = _a.sent();
                        this._tokenStorage.token = tokenResult.token;
                        return [2 /*return*/];
                }
            });
        });
    };
    return Auth;
}());
Auth = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject('authConfig')),
    __metadata("design:paramtypes", [http_1.HttpClient, Object, token_storage_service_1.TokenStorageService])
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map
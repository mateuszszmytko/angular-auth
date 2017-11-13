"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var login_form_component_1 = require("./components/login-form/login-form.component");
var register_form_component_1 = require("./components/register-form/register-form.component");
var auth_interceptor_1 = require("./interceptors/auth.interceptor");
var content_interceptor_1 = require("./interceptors/content.interceptor");
var SharedAuthModule = (function () {
    function SharedAuthModule() {
    }
    return SharedAuthModule;
}());
SharedAuthModule = __decorate([
    core_1.NgModule({
        declarations: [
            register_form_component_1.RegisterFormComponent,
            login_form_component_1.LoginFormComponent,
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpClientModule
        ],
        providers: [
            {
                provide: http_1.HTTP_INTERCEPTORS,
                useClass: auth_interceptor_1.AuthInterceptor,
                multi: true,
            },
            {
                provide: http_1.HTTP_INTERCEPTORS,
                useClass: content_interceptor_1.ContentInterceptor,
                multi: true,
            },
        ],
        exports: [
            login_form_component_1.LoginFormComponent, register_form_component_1.RegisterFormComponent
        ]
    })
], SharedAuthModule);
exports.SharedAuthModule = SharedAuthModule;
//# sourceMappingURL=shared-auth.module.js.map
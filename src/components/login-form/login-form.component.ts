import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CurrentUserService, AuthService } from '../../services';
import { LoginData } from '../..//models';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
    public model: LoginData = new LoginData();
    public processing: boolean = false;

    public returnUrl: string;
    public error: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _currentUser: CurrentUserService) { }

    ngOnInit() {
        console.log(this.model.password);
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    async login() {
        this.processing = true;
        try {
            const response = await this._currentUser.login(this.model);
            this.router.navigateByUrl(this.returnUrl);
        } catch(e) {
            this.error = e.status == 401? 
                "Wrong password or login.":
                "Unexpected error. Try again leter."
        }
        this.processing = false;

    }

}

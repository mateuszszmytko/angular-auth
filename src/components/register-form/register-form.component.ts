import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CurrentUserService } from '../../services';
import { RegisterData } from '../../models';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
	model: RegisterData = new RegisterData();
	public processing: boolean = false;
	public errors: string[] = [];

	constructor(private _currentUser: CurrentUserService, private router: Router) { }

	ngOnInit() {

	}

	async register() {
		this.processing = true;
		try {
			const response = await this._currentUser.register(this.model);

			this.router.navigateByUrl('/');
		} catch(e) {
			console.log(e);
			this.errors = [];

			for(let error of e.error) {
				this.errors.push(error.description);
			}
			console.log(this.errors);
		}

		this.processing = false;

		

	}

}

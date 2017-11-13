import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { LoginFormComponent } from './login-form.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '../../../index';
import { DebugElement } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('LoginComponent', () => {
  	let component: LoginFormComponent;
  	let fixture: ComponentFixture<LoginFormComponent>;
  	let de:      DebugElement;
  	let el:      HTMLElement;

  	beforeEach(() => {
    	TestBed.configureTestingModule({
      	declarations: [ LoginFormComponent ],
      	imports: [AuthModule,FormsModule, RouterTestingModule],
      	providers: [
        		{ provide: ComponentFixtureAutoDetect, useValue: true }
      	]
    	})

    	fixture = TestBed.createComponent(LoginFormComponent);

    	component = fixture.componentInstance; // BannerComponent test instance

    	// query for the title <h1> by CSS element selector
    	de = fixture.debugElement.query(By.css('form'));
    	el = de.nativeElement;

    	component.ngOnInit();
  	});

  	afterEach(() => {
    	fixture.detectChanges();
  	});

  	it('should be created', () => {
   	expect(component).toBeTruthy();
  	});

  	it('login should error', async (done) => {
		await component.login();
	
		expect(component.error).not.toBeNull();
   	expect(component.error).not.toBeUndefined();    
	
		done();
  	});

});

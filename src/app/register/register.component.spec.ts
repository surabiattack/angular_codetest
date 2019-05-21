import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import * as libPhoneNumber from 'libphonenumber-js';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent, DashboardComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule, AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.regForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.regForm.controls['email'];
    email.setValue(null);
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('email pattern should false', () => {
    let email = component.regForm.controls['email'];
    email.setValue('asd11s');
    expect(email.invalid).toBeTruthy;
  });

  it('email pattern should true', () => {
    let email = component.regForm.controls['email'];
    email.setValue('asd11s@adasd.com');
    expect(email.valid).toBeTruthy;
  });

  it('Mobile Number validity', () => {
    let existMobileNumber = libPhoneNumber.parsePhoneNumberFromString('085722311020', "ID");
    let nonExistMobileNumber = libPhoneNumber.parsePhoneNumberFromString('085722311021', "ID");
    let mobileNumber = component.regForm.controls['mobileNumber'];
    mobileNumber.setValue('085722311020');
    const number = libPhoneNumber.parsePhoneNumberFromString(mobileNumber.value, "ID");
    
    expect(number.isValid()).toBe(true);
    expect(number.nationalNumber).toEqual(existMobileNumber.nationalNumber);
    expect(number.nationalNumber).not.toEqual(nonExistMobileNumber.nationalNumber);
  });

  it('date validity', ()=>{
    expect(Date.parse('2019-2-31')).toBeNaN;
    expect(Date.parse('2019-5-20')).toEqual(Date.parse('2019-5-20'));
  });

  it('should form submitted', async(()=>{
    spyOn(component, 'onFormSubmit');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    let buttonLogin = fixture.debugElement.nativeElement.querySelector('#btn-login');
    //console.log(button);
    button.click();
    fixture.whenStable().then(() => {
      expect(component.onFormSubmit).toHaveBeenCalled();
      expect(buttonLogin)
      //console.log(component.onClickLogin);
    })
  }));

  
});

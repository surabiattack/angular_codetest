import { Component, OnInit } from '@angular/core';
import { Register } from '../register';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import * as libPhoneNumber from 'libphonenumber-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  lMonth:any[] = [
    {label:'January', value:'1'},
    {label:'February', value:'2'},
    {label:'March', value:'3'},
    {label:'April', value:'4'},
    {label:'May', value:'5'},
    {label:'June', value:'6'},
    {label:'July', value:'7'},
    {label:'August', value:'8'},
    {label:'September', value:'9'},
    {label:'October', value:'10'},
    {label:'November', value:'11'},
    {label:'December', value:'12'}
  ];
  lYear:number[]=[];
  register: Register = new Register();
  submitted = false;
  disableForm = false;
  respStatus: any;
  respMessage: any;
  respArrMessage:string[]=[];
  regForm:FormGroup;

  constructor(private registerService:RegisterService, private router: Router) { 
    
  }

  ngOnInit() {
    for(let i = 1900; i < 2019; i++){
      this.lYear.push(i);
    }

    this.regForm = new FormGroup({
      'mobileNumber': new FormControl(this.register.mobileNumber,[
        Validators.required
      ]),
      'firstName': new FormControl(this.register.firstName,[
        Validators.required
      ]),
      'lastName': new FormControl(this.register.lastName,[
        Validators.required
      ]),
      'month': new FormControl(this.register.monthBirth,[]),
      'date': new FormControl(this.register.dateBirth,[]),
      'year': new FormControl(this.register.yearBirth,[]),
      'gender': new FormControl(this.register.gender,[]),
      'email': new FormControl(this.register.email,
        Validators.compose([Validators.email, Validators.required])
      )
    })
  }

  lDay(i:number){
    return new Array(i);
  }

  onFormSubmit(){
    this.respArrMessage = new Array();
    // this.disableForm = true;
    this.submitted = true;
    // this.RegisterUser();
    //this.regForm.disable();

    if(this.regForm.valid){
      this.regForm.get('mobileNumber');
      if(this.validatePhoneNumber()){
        console.log('data valid');
        this.RegisterUser();
      }else{
        console.log('phone invalid');
        this.respArrMessage.push('Not Indonesia Mobile Number Format');
        this.regForm.enable();
      }
    }
    else{
      this.findInvalidControls();
      this.regForm.enable();
    }
  }

  validatePhoneNumber(){
    const number = libPhoneNumber.parsePhoneNumberFromString(String(this.regForm.get('mobileNumber').value), "ID");
    return number.isValid();
  }

  findInvalidControls(){
    if(this.regForm.get('mobileNumber').invalid){
      this.respArrMessage.push('Mobile Number invalid');
    }

    if(this.regForm.get('firstName').invalid){
      this.respArrMessage.push('First Name Required');
    }

    if(this.regForm.get('lastName').invalid){
      this.respArrMessage.push('Last Name Required');
    }

    if(this.regForm.get('email').hasError('required')){
      this.respArrMessage.push('Email Required');
    }

    if(this.regForm.get('email').hasError('email')){
      this.respArrMessage.push('Email is invalid');
    }
  }

  RegisterUser(){
    //console.log(this.regForm.value)
    this.registerService.CreateUser(this.regForm.value).subscribe(
      (success: any) => { 
        // console.log(success);
        this.respStatus = success.status;
        this.respMessage = success.message;
        this.respArrMessage = success.arrMessage;
        console.log(this.respArrMessage);

        if(this.respStatus == 'success')
          this.regForm.disable();
          //this.disableForm = false;
      }, 
      error => {
        //this.disableForm = false;
        this.regForm.enable();
        this.respArrMessage = error.message;
        console.log(error);
      }
    );
  }

  onClickLogin(){
    this.router.navigateByUrl('/dashboard');
  }
}

import { Component, OnInit } from '@angular/core';
import { Register } from '../register';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

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

  constructor(private registerService:RegisterService, private router: Router) { 
    
  }

  ngOnInit() {
    for(let i = 1900; i < 2019; i++){
      this.lYear.push(i);
    }
  }

  lDay(i:number){
    return new Array(i);
  }

  onFormSubmit(){
    this.disableForm = true;
    this.submitted = true;
    this.RegisterUser();

  }

  RegisterUser(){
    this.registerService.CreateUser(this.register).subscribe(
      (success: any) => { 
        // console.log(success);
        this.respStatus = success.status;
        this.respMessage = success.message;
        this.respArrMessage = success.arrMessage;
        console.log(this.respArrMessage);

        if(this.respStatus != 'success')
          this.disableForm = false;
      }, 
      error => {
        this.disableForm = false;
        console.error(error)
      }
    );
  }

  onClickLogin(){
    this.router.navigateByUrl('/dashboard');
  }
}

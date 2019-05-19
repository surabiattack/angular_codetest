import { Injectable } from '@angular/core';
import { Register } from './register';
import {HttpHeaders} from '@angular/common/http'; 
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  Url:string;
  token:string;
  header:any;

  constructor(private http:HttpClient) { 
    this.Url = 'http://localhost:8080/api';
  }

  CreateUser(register:Object):Observable<Object>{
    return this.http.post(`${this.Url}/user`, register)
  }
}

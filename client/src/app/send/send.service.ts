import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Send} from './send';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': 'https://localhost:8080'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SendService {

  send: Send;

  constructor(private http : HttpClient ) {}

  public sendMessage(send : Send){
    return this.http.post<Send>('http://localhost:8080/api/send/message', send, httpOptions);
  }
}

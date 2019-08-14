import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Group} from './group';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': 'https://localhost:8080' 
  })
};
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  group: Group;

  constructor(private http: HttpClient) { }
  

  getGroups(): Observable<any>{
    return this.http.get('http://localhost:8080/api/listgroups').pipe(map(this.group));
  }

  createGroup(newGroup){
    
    return this.http.post('http://localhost:8080/api/group/newgroup', newGroup, httpOptions)
    .subscribe(response => console.log(response));
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Injectable()
export class MainService {

  baseURL: String = 'http://localhost:8080/';
  headers: Headers;

  constructor(
    public http: Http,
    public router: Router
    ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  get(object: String) {
    return this.http.get(this.baseURL + '' + object, { headers: this.headers })
    .map(res => res.json());
  }

  post(object: String, data: any) {
    return this.http.post(this.baseURL + '' + object, JSON.stringify(data), { headers: this.headers })
    .map(res => res.json());
  }

  delete(object: String) {
    return this.http.delete(this.baseURL + '' + object, { headers: this.headers })
    .map(res => res.json());
  }

  put(object: String, data: any) {
    return this.http.put(this.baseURL + '' + object, JSON.stringify(data), { headers: this.headers })
    .map(res => res.json());
  }
}

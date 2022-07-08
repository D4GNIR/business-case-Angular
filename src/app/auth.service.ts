import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";
import { UrlApi } from './service/url-api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) {}

    getRequest(): Observable<any> {
      return this._httpClient.get('oui');
    }

    loginCheck(data: {email: string, password: string}): Observable<any> {
      return this._httpClient.post(UrlApi.loginCheck, data);
    }
}

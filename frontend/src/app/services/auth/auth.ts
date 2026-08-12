import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Register} from '../../interfaces/register';
import {Credentials} from '../../interfaces/credentials';
import {Observable} from 'rxjs';
import {SignInResponse} from '../../interfaces/sign-in-response';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private readonly TOKEN_KEY = "subscapce_token";

  constructor() {
  }

  registerUser(register: Register) {
    return this.http.post(`http://localhost:3001/api/v1/auth/signup`, register,  {observe: 'response'})
  }

  logUser(credentials: Credentials): Observable<HttpResponse<SignInResponse>> {
    return this.http.post<SignInResponse>(`http://localhost:3001/api/v1/auth/signin`, credentials,  {observe: 'response'})
  }

  isAuthenticated() {
      return this.getToken() !== null;
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

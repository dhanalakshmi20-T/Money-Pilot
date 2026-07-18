import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest } from '../../models/auth/login-request';
import { RegisterRequest } from '../../models/auth/register-request';
import { RegisterResponse } from '../../models/auth/register-response';
import { LoginResponse } from '../../models/auth/login-response';
import { AuthUser } from '../../models/auth/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  private userSubject = new BehaviorSubject<AuthUser | null>(this.loadStoredUser());

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response: LoginResponse) => {
        this.saveSession(response);
      })
    );
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.userSubject.next(null);
  }

  saveSession(response: LoginResponse): void {
    console.log("Saving Session...");
    console.log("Token:", response.token);
    console.log("User:", response.user);
    
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    this.userSubject.next(response.user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): AuthUser | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  updateUser(user: AuthUser): void {
    localStorage.setItem('user', JSON.stringify(user));

    this.userSubject.next(user);
  }

  private loadStoredUser(): AuthUser | null {
    const user = localStorage.getItem('user');
    
    return user ? JSON.parse(user) : null;
  }
}

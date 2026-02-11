import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VerificationResponse, RegistrationRequest, RegistrationResponse } from '../store/model/auth.model';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly AUTH_API_URL = 'https://todoo.nikitonz.com/api/auth';
  constructor( private http: HttpClient ) {}

  public register(credentials: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(
      `${this.AUTH_API_URL}/signup`,
      credentials
    );
  }

  public verifyRegistration(verifyToken: string): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(
      `${this.AUTH_API_URL}/signin`,
      { token: verifyToken }
    );
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:4000/api/users";

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  signup(credentials: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/signup`, credentials)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (error.error.message) {
      alert(error.error.message);
    }
    return throwError(() => new Error(errorMessage));
  }
}

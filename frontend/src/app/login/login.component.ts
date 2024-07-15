import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log("Login successful:", response);
          localStorage.setItem("token", response.token);
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.errorMessage = "OOPS! Your email is not registered!";
          } else {
            this.errorMessage = error.message || "Unknown error occurred.";
          }
          this.showAlert(this.errorMessage);
        },
      });
    }
  }

  showAlert(message: string): void {
    alert(message);
  }
}

import { Component, OnInit } from "@angular/core";
import { HomeService } from "../home.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  userData: any;

  constructor(
    private homeService: HomeService,
    private router: Router,
  ) {}

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(["/login"]);
    }
    this.homeService.getProfile().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (error) => {
        console.error("Error fetching profile:", error);
      },
    });
  }
}

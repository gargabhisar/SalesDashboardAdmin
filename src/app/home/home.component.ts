import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isActive: boolean = false;

  Name: string = 'Login User';
  Role: string = 'Role';

  constructor(private webapi: ApiService, private router: Router) {
    var loggedInUser = webapi.getLoginDetails();

    if (loggedInUser === undefined) {
      this.router.navigateByUrl('/login')
    }

    this.Name = loggedInUser?.name;
    this.Role = loggedInUser?.role;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}

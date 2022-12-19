import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.route.navigateByUrl("login");
  }

  login() {
    this.route.navigateByUrl("login");
  }

}

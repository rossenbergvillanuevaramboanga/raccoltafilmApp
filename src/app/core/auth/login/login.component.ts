
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: User = { username: '', password: '', token: '' };
  destroy$: Subject<boolean> = new Subject();

  constructor(private route: Router, private authService: AuthService) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }

  login(userForm: NgForm) {
    if (userForm.valid) {
      this.authService.login(userForm.value).
        pipe(
          tap(ele => this.authService.setUserLogged(ele)),
          takeUntil(this.destroy$),
          switchMap((user: User) => {
            return this.authService.getUserInfo().pipe(
              map((userInfo: User) => {
                return { ...userInfo, token: user.token }
              })
            )
          })
        ).subscribe(
          res => {
            this.authService.setUserLogged(res);
            this.route.navigateByUrl("welcome");
          });
    }
  }

}



// this.authService.login(this.loginForm).pipe(takeUntil(this.destroy$)).subscribe(res => {
//   this.authService.setUserLogged(res);
//   this.route.navigateByUrl("welcome");
// });
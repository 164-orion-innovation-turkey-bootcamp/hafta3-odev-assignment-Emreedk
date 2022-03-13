import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private dataService: DataserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    //validasyon kontrol
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginUser = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      this.dataService.getData().subscribe((users) => {
        users.forEach((user) => {
          if (
            loginUser.email == user.user.email &&
            loginUser.password == user.user.password
          ) {
            localStorage.setItem('user', JSON.stringify(user));
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Email or Password Wrong';
            this.timer();
          }
        });
      });
    }
  }
  timer() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}

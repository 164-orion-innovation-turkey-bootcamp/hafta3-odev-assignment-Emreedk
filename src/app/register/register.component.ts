import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordWarning: string;
  checkPasswords: ValidatorFn = (
    registerForm: AbstractControl
  ): ValidationErrors | null => {
    let pass = registerForm.get('password').value;
    let confirmPass = registerForm.get('rePassword').value;
    if (pass != confirmPass && confirmPass) {
      this.passwordWarning = "Password doesn't match";
    } else {
      this.passwordWarning = '';
    }
    return pass === confirmPass ? null : { notSame: true };
  };

  constructor(
    private dataService: DataserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30})'),
        ]),
        rePassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.checkPasswords,
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerUser = {
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
      };
      console.log('onSubmit çalışıyor');
      this.dataService.postData(registerUser).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/login']);
      });
    }
  }
}

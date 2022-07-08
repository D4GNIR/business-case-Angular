import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from 'src/models/User';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  private _email: string = "";
  private _password: string = "";
  error: string = '';
  userFormGroup!: FormGroup;
  user!: User;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    // localStorage.setItem('truc','dkdkdk')
    // this._authService.login('admin@admin.com','root');
    this.userFormGroup = new FormGroup(
      {
        email: new FormControl(
          this._email,[
            Validators.required,
            Validators.email
          ]
        ),
        password: new FormControl(
          this._password,[
            Validators.required
          ]
        )
      }
    );
  }
  getFormControl(key: string): AbstractControl {
    return this.userFormGroup.controls[key];
  }

  isFormControlInvalid(key: string): boolean {
    const field: AbstractControl = this.getFormControl(key);
    return field.invalid && (field.touched || field.dirty);
  }
  onSubmit(): void {
    if (this.userFormGroup.valid) {
      const jsonPostUser: {email: string, password: string} = {
        email: this.getFormControl('email').value,
        password: this.getFormControl('password').value
      };

      this._authService.loginCheck(jsonPostUser).subscribe((response) => {
        console.log(response);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.error = 'Identifiants invalides';
          }
        }

      });
    }
  }

}

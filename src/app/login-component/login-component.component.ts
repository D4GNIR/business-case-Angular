import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  userFormGroup!: FormGroup;
  user!: User;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    // localStorage.setItem('truc','dkdkdk')
    this._authService.login('admin@admin.com','root');
    this.userFormGroup = new FormGroup(
      {
        _email: new FormControl(
          '',[
            Validators.required
          ]
        ),
        _password: new FormControl(
          '',[
            Validators.required
          ]
        )
      }
    );
  }
   get email(): AbstractControl {
     return <AbstractControl>this.userFormGroup.get('_email');
   }
   get password(): AbstractControl {
    return <AbstractControl>this.userFormGroup.get('_password');
  }
  onSubmit():void {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
  }


}

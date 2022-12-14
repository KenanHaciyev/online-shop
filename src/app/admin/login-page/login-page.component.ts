import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;

  constructor(private authServ: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken:true
    }

    this.authServ.login(user).subscribe(data => {
        this.form.reset()
        this.router.navigate(['/admin', 'dashboard'])
        this.submitted = false
      }, () => {
        this.submitted = false
      }
    )
  }
}

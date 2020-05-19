import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status = true;
  loginForm: FormGroup

  constructor(private form: FormBuilder, private auth: AuthService, private route: Router) { }

  ngOnInit() {
    this.loginForm = this.form.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  submit() {
    if (this.loginForm.valid) {
      this.status = false;
      this.auth.login(this.loginForm.getRawValue()).toPromise().then(() => {
        this.route.navigate(['home'])
      }).catch((err) => {
        console.error(err)
        alert('Usuário ou senha incorretos!')
        this.status = true
      })
    } else {
      this.status = true;
      alert('Preencha os campos corretamente!')
    }
  }

}

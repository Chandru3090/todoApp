import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  alertFailure = '';
  constructor(private formBuilder: FormBuilder, private service: TodoService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(data => {
        if (data['data']) {
          this.service.user = data['data'];
          this.service.loggedIn(true);
          this.router.navigate(['./home']);
        } else {
          this.alertFailure = 'Invalid Username or password!';
        }
      });
    }
  }

  register() {
    this.router.navigate(['register']);
  }
}

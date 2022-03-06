import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../dto/userdto';
import { Authservice } from '../services/authservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: Authservice) { }

  // tslint:disable-next-line:new-parens
  users: User = new User;
  output: JSON;

  failed: JSON;

  login = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

  logins(): void {
    this.users.name = this.login.get('name').value;
    this.users.password = this.login.get('password').value;
    this.authService.login(this.users).subscribe(
      (result) => {
        this.output = this.failed as JSON;
      }
    );
  }

}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../dto/userdto';
import {Authservice} from '../services/authservice';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: Authservice) {
  }

  // tslint:disable-next-line:new-parens
  users: User = new User;
  output: JSON;

  failed: JSON;

  login = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    mobile: new FormControl(''),
    address: new FormControl(''),
  });
  emptyfielderr = false;
  ngOnInit() {
  }

  signup(): void {
    this.users.name = this.login.get('name').value;
    this.users.password = this.login.get('password').value;
    this.users.mobile = this.login.get('mobile').value;
    this.users.address = this.login.get('address').value;
    // tslint:disable-next-line:triple-equals
    if (this.users.name != '' && this.users.password != '' && this.users.mobile != '' && this.users.address != '') {
      this.emptyfielderr = true;
      this.authService.signup(this.users).subscribe(
        (result) => {
        }
      );
    } else {
      this.emptyfielderr = true;
    }
  }

}

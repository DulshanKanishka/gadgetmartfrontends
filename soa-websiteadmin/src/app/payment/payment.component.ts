import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authservice } from '../services/authservice';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private authservice: Authservice) { }

  pays = new FormGroup({
    
  });

  ngOnInit() {
  }

  logout(){
    this.authservice.logout();
  }

}

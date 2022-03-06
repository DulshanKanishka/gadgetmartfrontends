import {Component, OnInit} from '@angular/core';
import {Itemservice} from '../services/itemservice';
import {Authservice} from '../services/authservice';
import {Itemdto} from '../dto/itemdto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // constructor() { }
  constructor(private itemService: Itemservice, private authService: Authservice, private router: Router) {
  }

  item: Array<Itemdto> = [];

  items = new FormGroup({
    profile: new FormControl('', Validators.required)
  });
  loginbt = true;
  logoutbt = false;
  cartitem = 0;
  cartvalue = 0;

  ngOnInit() {
    this.loadAllItems();
    this.checklogin();
    this.getcartitemcount();
  }

  checklogin(): void {
    const getSessionStorage = sessionStorage.getItem('token');
    if (getSessionStorage !== null) {
      this.loginbt = false;
      this.logoutbt = true;
    }
  }

  loadAllItems(): void {
    const exitcart = sessionStorage.getItem('cart');
    let cartitemss = [];
    this.itemService.getItemsList().subscribe(
      (result) => {
        if (result) {
          if (exitcart) {
            const cdata = JSON.parse(exitcart);
            result.forEach(function (value) {
              cdata.itemdata.forEach(function (cvalue) {
                // aa = aa + value.itemcount;
                if (cvalue.itemid == value.id) {
                  if (cvalue.itembrand == value.name) {
                    value.price = value.price * cvalue.itemcount;
                    value.name = cvalue.itemcount;
                    cartitemss.push(value);
                  }
                }
              });
            });
          }

        }

        this.item = cartitemss;
      }
    );
  }

  getcartitemcount() {
    const exitcart = sessionStorage.getItem('cart');
    let ic = 0;
    let iv = 0;
    if (exitcart) {
      const cdata = JSON.parse(exitcart);
      cdata.itemdata.forEach(function (value) {
        ic = ic + value.itemcount;
        iv = iv + value.itemprice;
      });
    }
    this.cartitem = ic;
    this.cartvalue = iv;
    if (this.cartitem == 0) {
      this.router.navigate(['/route-item']);
    }
  }

  placeorder() {
    sessionStorage.removeItem('cart');
    this.router.navigate(['/route-item']);

  }

  addtocart(ibrand, iid) {
    const exitcart = sessionStorage.getItem('cart');

    const useridd = 1;
    const itemdata = [
      {
        itemid: iid,
        itembrand: ibrand,
        itemcount: 1,
      }
    ];
    if (exitcart) {
      const cdata = JSON.parse(exitcart);
      const nnewitemdata = {
        itemid: iid,
        itembrand: ibrand,
        itemcount: 1,
      };
      // let idata = ;
      // let num = [7, 8, 9];
      let other = true;
      cdata.itemdata.forEach(function (value) {
        itemdata.forEach(function (newvalue) {
          if (newvalue.itemid == value.itemid) {
            if (newvalue.itembrand == value.itembrand) {
              other = false;
              value.itemcount++;
            }
          }
        });
      });
      if (other) {
        cdata.itemdata.push(nnewitemdata);
        // this.imagesArray.push(result[i]);
      }
      sessionStorage.setItem('cart', JSON.stringify(cdata));

    } else {
      const cartdata = {
        userid: useridd,
        itemdata,
      };
      sessionStorage.setItem('cart', JSON.stringify(cartdata));
    }
    this.getcartitemcount();
  }

  logout() {
    this.authService.logout();
  }

  getUser() {
    this.items.setValue = this.authService.getUser;
  }
}

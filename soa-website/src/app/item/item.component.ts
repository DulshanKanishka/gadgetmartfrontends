import {Component, OnInit} from '@angular/core';
import {Itemservice} from '../services/itemservice';
import {Itemdto} from '../dto/itemdto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Authservice} from '../services/authservice';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private itemService: Itemservice, private authService: Authservice) {
  }

  item: Array<Itemdto> = [];

  items = new FormGroup({
    profile: new FormControl('', Validators.required)
  });
  loginbt = true;
  logoutbt = false;
  cartitem = 0;

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
    this.itemService.getItemsList().subscribe(
      (result) => {
        this.item = result;
      }
    );
  }

  getcartitemcount() {
    const exitcart = sessionStorage.getItem('cart');
    let aa = 0;
    if (exitcart) {
      const cdata = JSON.parse(exitcart);
      cdata.itemdata.forEach(function(value) {
        aa = aa + value.itemcount;
      });
    }
    this.cartitem = aa;
  }

  addtocart(ibrand, iid, price) {
    const exitcart = sessionStorage.getItem('cart');

    const useridd = 1;
    const itemdata = [
      {
        itemid: iid,
        itembrand: ibrand,
        itemprice: price,
        itemcount: 1,
      }
    ];
    if (exitcart) {
      const cdata = JSON.parse(exitcart);
      const nnewitemdata = {
        itemid: iid,
        itembrand: ibrand,
        itemprice: price,
        itemcount: 1,
      };
      let other = true;
      cdata.itemdata.forEach(function(value) {
        itemdata.forEach(function(newvalue) {
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

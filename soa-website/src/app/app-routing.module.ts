import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import {CartComponent} from "./cart/cart.component";


const routes: Routes = [
  { path: 'route-item', component: ItemComponent },
  { path: 'route-cart', component: CartComponent },
  { path: 'route-card', component: CardComponent },
  { path: 'route-login', component: LoginComponent },
  { path: 'route-sign', component: SignupComponent },
  { path: 'route-pay', component: PaymentComponent },
  { path: 'route-profile', component: ProfileComponent},
  { path: '', redirectTo: '/route-item', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

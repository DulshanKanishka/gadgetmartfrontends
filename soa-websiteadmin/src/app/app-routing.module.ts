import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import {CartComponent} from "./cart/cart.component";
import {VieworderComponent} from "./vieworder/vieworder.component";


const routes: Routes = [
  { path: 'route-item', component: ItemComponent },
  { path: 'route-orders', component: CartComponent },
  { path: 'route-card', component: CardComponent },
  { path: 'route-login', component: LoginComponent },
  { path: 'route-sign', component: SignupComponent },
  { path: 'route-pay', component: PaymentComponent },
  { path: 'route-profile', component: ProfileComponent},
  { path: 'route-viewordder/:id', component: VieworderComponent},
  { path: '', redirectTo: '/route-login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

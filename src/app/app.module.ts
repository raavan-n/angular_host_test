import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { AuthService } from './auth.service';
import { UserOpsService } from './user/services/user-ops.service';
import { CartService } from './products/services/cart.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './products/cart/cart.component';

import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { FilterPipe } from './filter.pipe';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    ProductsComponent,
    CartComponent,
    FilterPipe,
    AdminComponent,
    UsersComponent,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [AuthService, UserOpsService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

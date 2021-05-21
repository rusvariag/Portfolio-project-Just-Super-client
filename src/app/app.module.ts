import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SigninComponent } from './components/landing/signin/signin.component';
import { SignupComponent } from './components/landing/signup/signup.component';
import { AboutComponent } from './components/landing/signin/about/about.component';
import { DetailsComponent } from './components/landing/signin/details/details.component';
import { LoginComponent } from './components/landing/signin/auth/login/login.component';
import { ContinueComponent } from './components/landing/signin/auth/continue/continue.component';
import { ShopComponent } from './components/shop/shop.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ProductListComponent } from './components/shop/product-list/product-list.component';
import { ProductItemComponent } from './components/shop/product-list/product-item/product-item.component';
import { CategoryListComponent } from './components/shop/category-list/category-list.component';
import { SearchPanelComponent } from './components/shop/search-panel/search-panel.component';
import { UserPanelComponent } from './components/shop/user-panel/user-panel.component';
import { CartComponent } from './components/shop/user-panel/cart/cart.component';
import { CartItemComponent } from './components/shop/user-panel/cart/cart-item/cart-item.component';
import { AdminComponent } from './components/shop/user-panel/admin/admin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './guards/customer.guard';
import { AdminGuard } from './guards/admin.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BillComponent } from './components/checkout/bill/bill.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SigninComponent,
    SignupComponent,
    AboutComponent,
    DetailsComponent,
    LoginComponent,
    ContinueComponent,
    ShopComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ProductListComponent,
    ProductItemComponent,
    CategoryListComponent,
    SearchPanelComponent,
    UserPanelComponent,
    CartComponent,
    CartItemComponent,
    AdminComponent,
    CheckoutComponent,
    BillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CookieService, AuthGuard, AdminGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

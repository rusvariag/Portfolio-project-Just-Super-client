import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { SigninComponent } from './components/landing/signin/signin.component';
import { SignupComponent } from './components/landing/signup/signup.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ShopComponent } from './components/shop/shop.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/shop/user-panel/cart/cart.component';
import { AdminComponent } from './components/shop/user-panel/admin/admin.component';
import { LoginComponent } from './components/landing/signin/auth/login/login.component';
import { ContinueComponent } from './components/landing/signin/auth/continue/continue.component';
import { AuthGuard } from './guards/customer.guard';
import { AdminGuard } from './guards/admin.guard';
import { BillComponent } from './components/checkout/bill/bill.component';

const routes: Routes = [
    { path: '', redirectTo: 'auth/landing/continue', pathMatch: 'full' },
    {
        path: 'auth',
        component: LandingComponent,
        children: [
            {
                path: 'landing',
                component: SigninComponent,
                children: [
                    { path: 'login', component: LoginComponent },
                    {
                        path: 'continue',
                        component: ContinueComponent,
                        canActivate: [AuthGuard]
                    }
                ]

            },
            { path: 'register', component: SignupComponent }
        ]
    },
    {
        path: 'shop',
        component: ShopComponent,
        children: [
            {
                path: 'shopping',
                component: CartComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin',
                component: AdminComponent,
                canActivate: [AdminGuard]
            }
        ]
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bill',
        component: BillComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', component: PageNotFoundComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

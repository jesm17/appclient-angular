import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { BuyComponent } from './components/admin/buy/buy.component';
import { ProductComponent } from './components/admin/product/product.component';
import { UserComponent } from './components/admin/user/user.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { component: UserComponent, path: 'admin/user' },
  { component: ProductComponent, path: 'admin/products' },
  { component: LoginComponent, path: 'login' },
  { component: AdminComponent, path: 'admin' },
  { component: BuyComponent, path: 'admin/addbuy/:clientId' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

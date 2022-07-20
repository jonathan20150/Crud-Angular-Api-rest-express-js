import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'/auth/login',pathMatch:'full'},
  {path:'auth', redirectTo:'/auth/login',pathMatch:'full'},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

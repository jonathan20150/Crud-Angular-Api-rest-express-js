import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './agregar/agregar.component';
import { LoginComponent } from './login/login.component';
import { MdificarComponent } from './mdificar/mdificar.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'proveedores', component:ProveedoresComponent},
    {path:'agregar', component:AgregarComponent},
    {path:'edit/:id', component:MdificarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component'; 
import { AuthService } from '../services/auth.service';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { AgregarComponent } from './agregar/agregar.component';
import { MdificarComponent } from './mdificar/mdificar.component';

@NgModule({
  declarations: [LoginComponent,RegisterComponent, ProveedoresComponent, AgregarComponent, MdificarComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  AuthRoutingModule
  ],
  providers:[
    AuthService
  ],
})
export class AuthModule { }

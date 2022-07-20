import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MaterialesI } from '../models/materiales';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';



@Injectable()

export class AuthService {
AUTH_SERVER: string ='http://localhost:3050/api'; 
authSubject=new BehaviorSubject(false);
private token: any='';
private tkn:any='';

  constructor(private hhtpClient:HttpClient,private router:Router) { }

  update(id:string,material:MaterialesI){
    this.tkn=localStorage.getItem("ACCESS_TOKEN");
      const httpOptions = {
        headers: new HttpHeaders({
                     'authorization':this.tkn
        })
      };
      return this.hhtpClient.put(`${this.AUTH_SERVER}/update/`+id,material,httpOptions);
  }

eliminar(id:string){
    this.tkn=localStorage.getItem("ACCESS_TOKEN");
      const httpOptions = {
        headers: new HttpHeaders({
                     'authorization':this.tkn
        })
      };
      return this.hhtpClient.delete(`${this.AUTH_SERVER}/eliminar/`+id, httpOptions);
  }

agregarmat(material:MaterialesI,id_proveedor:string){
  this.tkn=localStorage.getItem("ACCESS_TOKEN");
    const httpOptions = {
      headers: new HttpHeaders({
                   'authorization':this.tkn
      })
    };
    return this.hhtpClient.post(`${this.AUTH_SERVER}/add/`+id_proveedor,material,httpOptions);
}


listar1mat(id:string){
  this.tkn=localStorage.getItem("ACCESS_TOKEN");
    const httpOptions = {
      headers: new HttpHeaders({
                   'authorization':this.tkn
      })
    };

    return this.hhtpClient.get<any>(`${this.AUTH_SERVER}/materiales/`+id,httpOptions).pipe(tap());




}


  listarmat(id_proveedor:string){
    this.tkn=localStorage.getItem("ACCESS_TOKEN");
    const httpOptions = {
      headers: new HttpHeaders({
                   'authorization':this.tkn
      })
    };
    return this.hhtpClient.get(`${this.AUTH_SERVER}/list_materiales/`+id_proveedor, httpOptions);
}


validatetoken(){
   this.tkn=localStorage.getItem("ACCESS_TOKEN");
   const httpOptions = {
    headers: new HttpHeaders({
                 'authorization':this.tkn
    })
  };
  return this.hhtpClient.get(`${this.AUTH_SERVER}/validatetoken`, httpOptions).pipe(tap());
}



login2(user:UserI):Observable<any>{
  
  return this.hhtpClient.post<any>(`${this.AUTH_SERVER}/login`,user).pipe(tap(
    (res)=>{
      if(res){
        //guardar token
        this.saveToken2(res.token);
      }
    }
  ));
}

logout():void{
  this.token='';
  localStorage.removeItem("ACCESS_TOKEN");
  this.router.navigate(['auth/login']);
  
}


private saveToken2(token:string): void{
  localStorage.setItem("ACCESS_TOKEN", token);
  this.token=token;
}


 getToken(): string{
  if(!this.token){
    this.token=localStorage.getItem("ACCESS_TOKEN");
  }
  return this.token;
}




}

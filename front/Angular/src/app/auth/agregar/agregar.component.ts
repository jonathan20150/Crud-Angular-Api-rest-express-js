import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user';
import { MaterialesI } from '../../models/materiales';
import { Observable } from 'rxjs';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  idus:any='';
  token:any='';
  constructor(private auth:AuthService,private router:Router) {

  }

  ngOnInit(): void {
    this.token=localStorage.getItem("ACCESS_TOKEN");
    if(this.token){
      this.valisesion();
    }else{
      this.router.navigate(['/auth/login']);
    }
  }

  
  valisesion(){

    this.auth.validatetoken().subscribe(res=>{
      
      if(res!='403'){
        var dat=JSON.stringify(res);
        var idu=dat.split(`"idusuario":`);
        var id1=idu[1];
        var idusuario=id1.split(",");
        this.idus=idusuario[0];
      }else {
        this.router.navigateByUrl('/auth/login');
      }
  });

 
  }

  onSubmit(f: NgForm) {
    var id_proveedor=this.idus;
    this.auth.agregarmat(f.value,id_proveedor).subscribe(res=>{
      if(res=='200'){
        this.router.navigateByUrl('/auth/proveedores');
      }else{
        f.resetForm();
      }      
      });
  }



  logout(){
    this.auth.logout();
    //location.reload();
  }
  

}

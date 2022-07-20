import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialesI } from '../../models/materiales';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  token:any='';
  list:MaterialesI[]=[];
  idus:any='';
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
        this.listmateriales();
      }else {
        this.router.navigateByUrl('/auth/login');
      }
  });

 
  }

  listmateriales(){
  
    this.auth.listarmat(this.idus).subscribe(
      res=>{
          this.list=<any>res;
      }

      );

  }

  // list1material(){
  //   const id='2';
  //   this.auth.listar1mat(id).subscribe(res=>{
  //         console.log(res);
  //     });

  // }

  delete(id:any){
    this.auth.eliminar(id).subscribe(res=>{
      this.listmateriales();
      });

  }

  // agregarmat(){
  //   const mat={
  //     id_proveedor:'190',
  //     nombre:'laptop Mac',
  //     descripcion:'4 ram'
  //   };
  //   this.auth.agregarmat(mat).subscribe(res=>{
  //         console.log(res);
  //     });

  // }

update(id:any){

  this.router.navigate(['/edit/'+id]);

  // this.auth.update(id,mat).subscribe(res=>{
  //       console.log(res);
  //   });  
}


logout(){
  this.auth.logout();
  //location.reload();
}

}

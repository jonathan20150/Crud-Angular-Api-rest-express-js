import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserI } from 'src/app/models/user';
import { MaterialesI } from '../../models/materiales';
import { Observable } from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-mdificar',
  templateUrl: './mdificar.component.html',
  styleUrls: ['./mdificar.component.css']
})
export class MdificarComponent implements OnInit {
  id:any='';
  material:MaterialesI={};
  constructor(private auth:AuthService,private router:Router, private actvrouter:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.valisesion();
  }

  
  valisesion(){

    this.auth.validatetoken().subscribe(res=>{
      
      if(res!='403'){
        this.actvrouter.params.subscribe(params=>{
          this.id=params['id'];

          this.auth.listar1mat(this.id).subscribe(res=>{
            this.material=res[0];
            });

            

        });
      }else {
        this.router.navigateByUrl('/auth/login');
      }
  });

 
  }


  
  onSubmit(f: NgForm) {
    console.log(f.value);
    this.auth.update(this.id,f.value).subscribe(res=>{
      console.log(res);
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

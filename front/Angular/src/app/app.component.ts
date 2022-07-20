import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  element=false;

  constructor(private auth:AuthService,private router:Router) {

  }



 ngOnInit(): void {
   this.valisesion();
 }

 valisesion(){

  this.auth.validatetoken().subscribe(res=>{
    if(res!='403'){
      this.router.navigateByUrl('/auth/proveedores');
    }else {
    }
});


}



}

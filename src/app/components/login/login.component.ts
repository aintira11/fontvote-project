import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Constants } from '../../config/constants'; //
import { HttpClientModule  } from '@angular/common/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { modelUser } from '../../model/models';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatInputModule,MatCardModule,MatIconModule,MatButtonModule
            ,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
// register() {
// throw new Error('Method not implemented.');
// }

  constructor(private Constants :Constants ,private http:HttpClient ,private fromBuilder : FormBuilder ,private router : Router,private location : Location){}

  user : modelUser[]=[];
  dataLogin:any[]=[];
  image_bigin : String='';
  mistake : string='';
  signerr: string='';

  fromreister = this.fromBuilder.group({
      Email:['',Validators.required],
      Password :['',Validators.required]
  });
  
  goback() {
    this.router.navigate(['/']);
    }

  // username: string = '';
  // password: string = '';

  async signIn(Email:HTMLInputElement,Password:HTMLInputElement) {
    const url = this.Constants.API_ENDPOINT+'/login/user';
    const formData ={
      Email: this.fromreister.value.Email,
      Password: this.fromreister.value.Password
    };
    let data = await lastValueFrom(
      this.http.get(url,{
        params: {
          Email : Email.value,
          Password : Password.value
        },
      })
    );
    
    this.dataLogin = data as modelUser[];
    console.log(data);
    if (this.dataLogin.length > 0) {
      // ตรวจสอบว่ามีข้อมูลใน dataLogin หรือไม่
      const isAdmin = this.dataLogin.some(user => user.Type === 'admin');
      if (isAdmin) {
        // หากเป็นแอดมิน ให้นำไปที่หน้า Main
        this.router.navigate(['/admin'], { state: { data: this.dataLogin[0] } });
        // this.printData();
      } else {
        this.router.navigate(['/'], { state: { data: this.dataLogin[0] } });

      }
    }else{
      alert("Please check your password and email again.");
    }
  }

  signUp() {
    this.router.navigate(['/members']);
  }
}

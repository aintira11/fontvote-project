
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../../config/constants';
import { modelUser } from '../../model/models';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menbership',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatInputModule,MatIconModule,MatButtonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './menbership.component.html',
  styleUrl: './menbership.component.scss'
})
export class MenbershipComponent {


  constructor(private Constants :Constants ,private http:HttpClient ,private fromBuilder : FormBuilder ,private router : Router,private location :Location){}

  users : modelUser[]=[];
  signerr : string='';
  fromreister = this.fromBuilder.group({
    Email:['',Validators.required],
    Password :['',Validators.required],
    UserName :['',Validators.required],
    Name :['',Validators.required]
});

  register() {
     const url = this.Constants.API_ENDPOINT+'/insert/add';
    
     const formData ={
      Email: this.fromreister.value.Email,
      Password: this.fromreister.value.Password,
      UserName: this.fromreister.value.UserName,
      Name: this.fromreister.value.Name
    };
    console.log(formData); 

    this.http.post(url,formData).subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/login']);
        // alert('Successful subscription');
      },
      error: (err)=>{
        console.error('Error :',err);
        this.signerr = 'Duplicate enter again'
      }
    });
      
    }

  goback() {
    this.location.back();
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Constants } from '../../config/constants';
import { modelUser } from '../../model/models';

import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {


  data: any;
  photo : string='';
  members: any[]=[];
  dataDif: any;
  dataimage: any;

  cooldownTimeValue!: any ;
  Time: any;
  
  constructor(private Constants: Constants, 
              private route: ActivatedRoute,
               private http: HttpClient,
               private router : Router,
              ) { }
  dataLogin: modelUser[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.data =window.history.state.data;
      this.Allmembers();
         
    });
    // console.log(this.data);
  }

  
  setCooldown() {
    console.log(this.cooldownTimeValue);
    
    const url = this.Constants.API_ENDPOINT + '/post/' + this.cooldownTimeValue;
    this.http.post(url, {}).subscribe({
      next: (res) => {
        console.log(res);
        
        console.log('Cooldown time has been set successfully.');
        alert('Cooldown time has been set successfully.');
        this.gettime();
      },
      error: (error) => {
        console.error('Error setting cooldown time:', error);
      }
    });
}
gettime(){
  const url = this.Constants.API_ENDPOINT+'/get/time';
  this.http.get(url).subscribe((timeget: any) => {
    this.Time = timeget;
    console.log("Time : ", JSON.stringify(this.Time) + " มิลลิวินาที");
  });
}


  
  printdata() {
    const url = this.Constants.API_ENDPOINT+this.data[0].Avatar;
    this.photo =url;
  }

  Allmembers() {
    const urlall = this.Constants.API_ENDPOINT+'/Allmembers/get/allMembers';
     // ใช้ HTTP GET เพื่อเรียกข้อมูล
     this.http.get(urlall).subscribe((Allm: any) => {
    this.members = Allm;
    console.log(this.members); // แสดงฟังก์ชัน randomimage
    }); 
    
  }

  isModelOpen: boolean = false;
  openmodel(ImageID: any) {
    const urlall = this.Constants.API_ENDPOINT+'/rankDiff/rank/diff/'+ImageID;
    
    this.http.get(urlall).subscribe((diff: any) => {
      this.dataDif = diff;
      console.log("dataDif image :",this.dataDif); // แสดงฟังก์ชัน randomimage
   });
   const dataimage = this.Constants.API_ENDPOINT+'/DataPhoto/data/'+ImageID;
   this.http.get(dataimage).subscribe((data: any) => {
    this.dataimage = data;
    console.log("data image :",this.dataimage); // แสดงฟังก์ชัน randomimage
 });
   this.isModelOpen = true;
  }
  close(){
    this.isModelOpen = false;
  }

  logout() {
    this.data = [];
   this.router.navigate(['/login']);
    }
}

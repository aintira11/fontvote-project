import { Component } from '@angular/core';
import { HeaderMyprofileComponent } from '../header-myprofile/header-myprofile.component';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { modelUser } from '../../model/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [HeaderMyprofileComponent,
            MatButtonModule,
            RouterModule,
            MatIconModule,
            RouterModule,
            HttpClientModule,
            CommonModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyprofileComponent {


  data: any;
  photo: any[] = [];
  constructor(private Constants: Constants, private route: ActivatedRoute, private http: HttpClient,private router : Router,private location : Location) { }
  dataLogin: modelUser[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.data =window.history.state.data;
      // this.printdata();
        
    });
    console.log(this.data);
    this.myphoto(this.data.User_Id);
  }
  
  uploadPhoto(User_Id : number) {
    console.log("User_Id : ",User_Id);
    this.router.navigate(['/upload'], { state: { data: User_Id } });
    }

    EditPro() {
      this.router.navigate(['/myprofile/edit'], { state: { data: this.data[0] } });
      }

  edit(User_Id: any) {
    this.router.navigate(['/edit'], { state: { data: User_Id } });
    }
      
    goback() {
      // this.location.back();
      this.router.navigate(['/'], { state: { data: this.data } });

      }
      logout() {
        this.data = [];
        this.router.navigate(['/login']);
      }
      
      myphoto(User_Id : any) {
        const url = this.Constants.API_ENDPOINT+'/myPhoto/User_Id?User_Id='+User_Id;
        // ส่งคำขอ GET ไปยัง URL ที่มีค่า User_Id แทนใน URL
        this.http.get(url).subscribe((response: any) => {
          this.photo = response; // กำหนดค่า constants เป็นข้อมูลรูปภาพที่ได้รับจากเซิร์ฟเวอร์
          console.log(this.Constants); // แสดงข้อมูลรูปภาพในคอนโซล
        });
      }

      Statistics(User_Id: any) {
        console.log("User ID :" , User_Id);
        this.router.navigate(['/statistics'], { state: { data: User_Id } });

        }
}

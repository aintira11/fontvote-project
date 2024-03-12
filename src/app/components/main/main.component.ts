import { Component ,OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

import { ActivatedRoute,Params  } from '@angular/router';
import { Constants } from '../../config/constants';
// import { modelUser } from '../../model/models';
import { ModelImage } from '../../model/models';
// import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatToolbarModule,
            MatButtonModule,
            MatIconModule,
            MatCardModule,
            RouterModule,
            HttpClientModule,
            CommonModule
          ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {


  constants :ModelImage []=[];
  data: any;
  photo : string='';
  dataLogin:any[]=[];
  randomPhoto:any;
  RankP: any[]=[];

  constructor(private Constants: Constants, private route: ActivatedRoute, private http: HttpClient,private router : Router) { }

  ngOnInit(): void {
   
    //รับข้อมูล จากหน้าที่ส่งมา
    this.route.paramMap.subscribe(params => {
    this.data =window.history.state.data;
      // this.printdata();
        
    });
    console.log(this.data);
    // console.log(this.data.Avatar);
    this.randomimage();
    this.Rank();
  }


  randomimage() {
    // ดึง URL ของ API ที่มีข้อมูลรูปภาพสุ่ม
    const urlall = this.Constants.API_ENDPOINT+'/random/random/image';
    
    // ใช้ HTTP GET เพื่อเรียกข้อมูลรูปภาพ
    this.http.get(urlall).subscribe((picran: any) => {
      this.randomPhoto = picran;
      for(let i=0;i<this.randomPhoto.length;i++){
        this.randomPhoto[i].Photo = this.Constants.API_ENDPOINT+this.randomPhoto[i].Photo;
        //console.log(this.randomPhoto[i]);
        
      }
    console.log(this.randomPhoto); // แสดงฟังก์ชัน randomimage
    });
  }

  Vote(ImageID: HTMLInputElement) {
    const ImageID1 = this.randomPhoto.photo1.ImageID;
    const ImageID2 = this.randomPhoto.photo2.ImageID;

    let Score1: number;
    let Score2: number;

    // กำหนดค่า Score1 และ Score2 ตามการโหวต
    //ถ้า รูปที่ถูกโหวต == 
    if(ImageID === this.randomPhoto.photo1.ImageID){
      Score1 = 1;
      Score2 = 0;
    }else {
      Score1 = 0;
      Score2 = 1;
    }
  const Data ={
    ImageID1:ImageID1,
    ImageID2:ImageID2,
    Score1:Score1,
    Score2:Score2
  };
    const  url = this.Constants.API_ENDPOINT+`/elo/vote`;
    this.http.post(url,Data).subscribe({
        next : (res) =>{
          console.log(res);
        },
        error : (err) =>{
          console.error('error jaa',err);
          
        }
    });
    console.log(url);
    this.randomimage();
    // location.reload();

  }

  Rank() {
    const urlall = this.Constants.API_ENDPOINT+'/RankPhoto/get/allPhoto';
     // ใช้ HTTP GET เพื่อเรียกข้อมูล
     this.http.get(urlall).subscribe((rankpic: any) => {
    this.RankP = rankpic;
    console.log(this.RankP); // แสดงฟังก์ชัน randomimage
    }); 
    
  }
    

logout() {
  this.data = [];
 this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/myprofile'], { state: { data: this.data } });
    this.router.navigate(['/myprofile/post'], { state: { data: this.data } });
    }

    WhoProfile(User_Id :HTMLInputElement ) {
      this.router.navigate(['/profilePerson'], { state: { data: User_Id } });
      }


}
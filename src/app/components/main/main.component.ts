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
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main',
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
  Rdif: any;

  Ra: any;
  Rb: any;
  Ea: any;
  Eb: any;
  score1: any;
  score2: any;
  apiData: any;
  
  isLoading: boolean = false;

  constructor(private Constants: Constants, private route: ActivatedRoute, private http: HttpClient,private router : Router) { }

  async ngOnInit(): Promise<void> {
   
    //รับข้อมูล จากหน้าที่ส่งมา
    this.route.paramMap.subscribe(params => {
    this.data =window.history.state.data;
      // this.printdata();
        
    });
    // console.log(this.data);
    this.randomimage();
    // this.Rank();
    // this.diff();
      this.isLoading = true;
      await this.delay(2500); // รอเวลา 5 วินาที
      this.isLoading = false;
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

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // สร้างตัวแปรสถานะเริ่มต้นโมเดลเป็นปิด
  isModelOpen: boolean = false;
  isSwitch :boolean = true;

  async Vote(ImageID: HTMLInputElement) {
    const ImageID1 = this.randomPhoto.photo1.ImageID;
    const ImageID2 = this.randomPhoto.photo2.ImageID;

    let Score1: number;
    let Score2: number;

    // กำหนดค่า Score1 และ Score2 ตามการโหวต
    if (ImageID === this.randomPhoto.photo1.ImageID) {
      Score1 = 1;
      Score2 = 0;
    } else {
      Score1 = 0;
      Score2 = 1;
    }

    const Data = {
      ImageID1: ImageID1,
      ImageID2: ImageID2,
      Score1: Score1,
      Score2: Score2
    };

    const url = this.Constants.API_ENDPOINT + '/elo/vote';
    this.http.post(url, Data).subscribe({
        next: (res) => {
          // console.log(res);
          this.apiData = res;     
          // console.log(this.apiData);
        },
        error: (err) => {
          console.error('error jaa', err);
        }
        // ,
        // complete: () => {
        //   this.isLoading = false;
        // }
    });

  

    
  if (this.isSwitch) {
    this.openModel();
  } else{
    this.randomimage();
      this.isLoading = true;
      await this.delay(2500); // รอเวลา 5 วินาที
      this.isLoading = false;
    
  }

}

openModel() {
  // เปลี่ยนสถานะเป็นเปิดเพื่อให้โมเดลแสดง
  this.isModelOpen = true;
}

  async closeModel() {
  // เปลี่ยนสถานะเป็นปิดเพื่อปิดโมเดล
  this.isModelOpen = false;
   this.randomimage();
      this.isLoading = true;
      await this.delay(2500); // รอเวลา 5 วินาที
      this.isLoading = false;
 
}


  Rank() {
    const urlall = this.Constants.API_ENDPOINT+'/RankPhoto/get/allPhoto';
     // ใช้ HTTP GET เพื่อเรียกข้อมูล
     this.http.get(urlall).subscribe((rankpic: any) => {
     this.RankP = rankpic;
    console.log("Rank :",this.RankP); 
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

 Rankpage() {
    this.router.navigate(['/rank'], { state: { data: this.data } });
    }

  WhoProfile(User_Id :HTMLInputElement ) {
    console.log("User_Id : ",User_Id);
    this.router.navigate(['/profilePerson'], { state: { data: User_Id } });
    }

  Statistics(User_Id: any) {
     console.log("User ID :" , User_Id);
     this.router.navigate(['/statistics'], { state: { data: User_Id } });
  }

 diff(){
   const urlall = this.Constants.API_ENDPOINT+'/rankDiff/get/diff';
   
   this.http.get(urlall).subscribe((rankdiff: any) => {
   this.Rdif = rankdiff;
  // console.log("Rank Diff",this.Rdif[0]); 
  }); 
 }

            

} 


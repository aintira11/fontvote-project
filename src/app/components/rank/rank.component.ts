import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Constants } from '../../config/constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModelImage } from '../../model/models';

@Component({
  selector: 'app-rank',
  standalone: true,
  imports: [ MatCardModule,
            CommonModule,
            HttpClientModule,
            MatToolbarModule,
            MatButtonModule,
            MatIconModule,],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.scss'
})
export class RankComponent {

  RankP: any[]=[];
  Rdif: any[]=[];
  Rall: any[]=[];
  data: any;
  dataPerson: any;
  constants: ModelImage[] = [];
  sumS:number=0;

  constructor(private Constants: Constants, private route: ActivatedRoute, private http: HttpClient,private router : Router) { }
  
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.data =window.history.state.data;
      // this.printdata();
        
    });
    // console.log("data frofile  :" ,this.data);
   
    this.Rank();
    this.diff();
    this.rankall();
    
  }

  Rank() {
    const urlall = this.Constants.API_ENDPOINT+'/RankPhoto/get/allPhoto';
    let dataR: any[]=[];
     // ใช้ HTTP GET เพื่อเรียกข้อมูล
     this.http.get(urlall).subscribe((rankpic: any) => {
     this.RankP = rankpic;
     for (let i = 0; i < this.RankP.length; i++) {
      dataR = this.RankP;
   }
    console.log("Rank :",dataR); 
    }); 
    
  }

  diff(){
    const urlall = this.Constants.API_ENDPOINT+'/rankDiff/get/diff';
    let dataRdiff: any[]=[];
    this.http.get(urlall).subscribe((rankdiff: any) => {
    this.Rdif = rankdiff;
    for (let i = 0; i < this.Rdif.length; i++) {
       dataRdiff = this.Rdif;
    }
    console.log("Rank Diff",dataRdiff);
   }); 
  }

  rankall(){
    const urlall = this.Constants.API_ENDPOINT+'/rankall/allPhoto/Rank';
    let datarankAll: any[]=[];
    this.http.get(urlall).subscribe((rankdiff: any) => {
    this.Rall = rankdiff;
    for (let i = 0; i < this.Rall.length; i++) {
      datarankAll = this.Rall;
    }
    console.log("Rank all",datarankAll);
   }); 
  }


    Statistics(User_Id: any) {
      console.log("User ID :" , User_Id);
      this.router.navigate(['/statistics'], { state: { data: User_Id } });
   }

   profile() {
    this.router.navigate(['/myprofile'], { state: { data: this.data } });
    this.router.navigate(['/myprofile/post'], { state: { data: this.data } });
    }
  Home(){
    this.router.navigate(['/'], { state: { data: this.data } });
  }

   logout() {
    this.data = [];
    this.router.navigate(['/login']);
    }

    scrollToRank() {
      const rankElement = document.getElementById('rank');
      if (rankElement) {
          rankElement.scrollIntoView({ behavior: 'smooth' });
      }
  }

  isModelOpen: boolean = false;
  Seeprofile(User_Id: any) {
    const urlall = this.Constants.API_ENDPOINT+'/getdata/read/'+User_Id;
    this.http.get(urlall).subscribe((datapre: any) => {
    this.dataPerson = datapre;
    // console.log("Data Person :",this.dataPerson);
   }); 
   this.myphoto(User_Id);
   this.isModelOpen = true;
  }
  
  closeModel() {
    this.isModelOpen = false;
  }
  
  myphoto(User_Id: number) {
    let sum = 0; // ตั้งค่า sum เริ่มต้นที่ 0
    const url = this.Constants.API_ENDPOINT + '/myPhoto/User_Id?User_Id=' + User_Id;
    this.http.get(url).subscribe((response: any) => {
        this.constants = response;
        for (let i = 0; i < this.constants.length; i++) {
            sum += this.constants[i].Score;
            this.sumS = sum; 
        }
        console.log("Image User :", this.constants); 
        console.log("Total Score:", sum); 
    });
}

    
}

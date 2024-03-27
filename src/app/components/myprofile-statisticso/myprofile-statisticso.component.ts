import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Constants } from '../../config/constants';
import { ActivatedRoute, Router ,RouterModule, RouterOutlet} from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-myprofile-statisticso',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,
            HttpClientModule,
            RouterOutlet,
            
            ],
  templateUrl: './myprofile-statisticso.component.html',
  styleUrl: './myprofile-statisticso.component.scss'
})
export class MyprofileStatisticsoComponent implements OnInit {

  data: any;
  Data: any[]=[];
  databack : any;
  Rdif: any;
  dataPoints!: any[];

  constructor(
    private Constants: Constants,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router : Router,
    private cdRef: ChangeDetectorRef
  ) {}

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.data = window.history.state.data;
      console.log(this.data);
      this.static(this.data);
    });
  }

  static(User_Id: number): void {
    const url = this.Constants.API_ENDPOINT + '/statistics/score/' + User_Id;
    this.http.get(url).subscribe((datavote: any) => {
      this.Data = datavote;
      console.log("Data static : ", this.Data);
      this.createCharts();
    });
  }

  createChartData(votes: any[]): any {
    const maxDate = new Date();
    const minDate = new Date(maxDate);
    minDate.setDate(maxDate.getDate() - 6); // นับย้อนหลัง 7 วัน
  
    const labels = [];
    const data = [];
  
    for (let currentDate = new Date(minDate); currentDate <= maxDate; currentDate.setDate(currentDate.getDate() + 1)) {
      labels.push(currentDate.toISOString().slice(0, 10));
  
      const vote = votes.find(v => v.Date_vote.slice(0, 10) === currentDate.toISOString().slice(0, 10));
      if (vote) {
        data.push(vote.V_Score);
      } else {
        data.push(null); // ใส่ค่า null ในกรณีที่ไม่มีข้อมูลในวันนั้น
      }
    }
    return { labels, data };
  }
  

  createCharts(): void {
    this.Data.forEach((ImageID: any) => {
      const chartData = this.createChartData(ImageID.Votes);
      
      // สร้าง canvas element สำหรับแต่ละรูปภาพ
      const container = document.createElement('div');
      container.style.display = 'block';
      container.style.marginTop = '-10%';
      container.style.width = '700px';
      container.style.height = '500px';
      container.style.marginLeft = '50px';
      // container.style.backgroundColor='white';
      
      const canvas = document.createElement('canvas');
      canvas.id = 'myChart-' + ImageID.ImageID;
      container.appendChild(canvas);
  
      // เพิ่ม canvas เข้าไปใน DOM
      const chartContainer = document.getElementById('chartContainer');
      if (chartContainer) {
        chartContainer.appendChild(container);
      }
  
      // สร้างกราฟใน canvas ของแต่ละรูปภาพ
      const ctx = canvas as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Score',
          data: chartData.data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            // grid: {
            //   color: 'white' // ตั้งค่าสีของเส้นกริดให้เป็นสีขาว
            // },
            ticks: {
              color: 'white' // กำหนดสีของ labels เป็นสีขาว
            },
            beginAtZero: true
          },
          
          x: {
            // grid: {
            //   color: 'white' // ตั้งค่าสีของเส้นกริดให้เป็นสีขาว
            // }
            ticks: {
              color: 'white' // กำหนดสีของ labels เป็นสีขาว
            }
          },
          
        }
      }
    });
    });
  }

  diff(User_Id : number){
    const urlall = this.Constants.API_ENDPOINT+'/rankDiff/get/diff/'+ User_Id;
    this.http.get(urlall).subscribe((rankdiff: any) => {
    this.Rdif = rankdiff;
  //  console.log("Rank Diff :",this.Rdif); 
   }); 
  }

  back() {
    const url = this.Constants.API_ENDPOINT + '/getdata/read/' + this.data;
    this.http.get(url).subscribe((dataPerson: any) => {
      this.databack = dataPerson;
      // console.log(this.databack);
      // ทำการเรียก navigate หลังจากที่ได้รับข้อมูลแล้ว
      this.router.navigate(['/myprofile'], { state: { data: this.databack[0] } });
      this.router.navigate(['/myprofile/post'], { state: { data: this.databack[0] } });
    });
  }

 
}

import { Component } from '@angular/core';
import { Constants } from '../../config/constants';
import { ActivatedRoute, Router ,RouterModule} from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-myprofile-statisticso',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,
            HttpClientModule],
  templateUrl: './myprofile-statisticso.component.html',
  styleUrl: './myprofile-statisticso.component.scss'
})
export class MyprofileStatisticsoComponent {

  data: any;
  Data: any[]=[];
  databack : any;
  Rdif: any;

  constructor(
    private Constants: Constants,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.data = window.history.state.data;
      console.log(this.data);

     this.static(this.data);
     this.diff(this.data);
    });
    
  }

  static(User_Id : number){
    const url = this.Constants.API_ENDPOINT + '/statistics/score/' + User_Id;
    this.http.get(url).subscribe((datavote: any) => {
      this.Data = datavote;
      console.log("DAta static : ",this.Data);
    });
  }

  getRandomColor() {
    // สุ่มค่าสี RGB
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // สร้างรหัสสี Hex
    const color = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
    return color;
  }

  diff(User_Id : number){
    const urlall = this.Constants.API_ENDPOINT+'/rankDiff/get/diff/'+ User_Id;
    this.http.get(urlall).subscribe((rankdiff: any) => {
    this.Rdif = rankdiff;
   console.log("Rank Diff :",this.Rdif); 
   }); 
  }

  back() {
    const url = this.Constants.API_ENDPOINT + '/getdata/read/' + this.data;
    this.http.get(url).subscribe((dataPerson: any) => {
      this.databack = dataPerson;
      console.log(this.databack);
      // ทำการเรียก navigate หลังจากที่ได้รับข้อมูลแล้ว
      this.router.navigate(['/myprofile'], { state: { data: this.databack[0] } });
      this.router.navigate(['/myprofile/post'], { state: { data: this.databack[0] } });
    });
  }

}

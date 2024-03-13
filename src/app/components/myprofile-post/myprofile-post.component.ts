import { Component ,OnInit} from '@angular/core';
import { Constants } from '../../config/constants';
import { modelUser } from '../../model/models';
import { ModelImage } from '../../model/models';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-myprofile-post',
  standalone: true,
  imports: [MatButtonModule,
            RouterModule,
            MatIconModule,
            RouterModule,
            HttpClientModule,
            CommonModule,
          MatIconModule],
  templateUrl: './myprofile-post.component.html',
  styleUrl: './myprofile-post.component.scss'
})
export class MyprofilePostComponent implements OnInit{


  data: any;
  constants: ModelImage[] = []; // สร้างอาเรย์เพื่อเก็บข้อมูลรูปภาพ
  Array: any;
  
  constructor(private Constants: Constants, private route: ActivatedRoute, private http: HttpClient,private router : Router ){}
  // User_Id!: number;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.data =window.history.state.data;
      // this.printdata();
        
    });
    console.log(this.data);
    this.myphoto(this.data.User_Id);
  }

  myphoto(User_Id : any) {
    const url = this.Constants.API_ENDPOINT+'/myPhoto/User_Id?User_Id='+User_Id;
    // ส่งคำขอ GET ไปยัง URL ที่มีค่า User_Id แทนใน URL
    this.http.get(url).subscribe((response: any) => {
      this.constants = response; // กำหนดค่า constants เป็นข้อมูลรูปภาพที่ได้รับจากเซิร์ฟเวอร์
      console.log(this.constants); // แสดงข้อมูลรูปภาพในคอนโซล
    });
  }

  EditPhoto(ImageID: number) {
    this.router.navigate(['/editphoto'], { state: { data: ImageID } });
  }

  delete(ImageID: number) {
    console.log(ImageID);
    const confirmed = window.confirm('Are you sure you want to delete this photo?');
    if (confirmed) {
      const url = this.Constants.API_ENDPOINT + '/Delete/' + ImageID;
      this.http.delete(url).subscribe(
        () => {
          console.log('ลบรูปภาพสำเร็จ');
          // รีโหลดหน้าหลังจากที่ลบรูปภาพเรียบร้อย
          location.reload();
        },
        error => {
          console.error('เกิดข้อผิดพลาดในการลบรูปภาพ:', error);
        }
      );
    }
  }
  

  
}

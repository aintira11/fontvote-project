import { Component ,OnInit} from '@angular/core';
import { Constants } from '../../config/constants';
import { ModelImage } from '../../model/models';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myprofile-post',
  standalone: true,
  imports: [MatButtonModule,
            RouterModule,
            MatIconModule,
            RouterModule,
            HttpClientModule,
            CommonModule,
          MatIconModule,
          FormsModule],
  templateUrl: './myprofile-post.component.html',
  styleUrl: './myprofile-post.component.scss'
})
export class MyprofilePostComponent implements OnInit{


  data: any;
  constants: ModelImage[] = []; // สร้างอาเรย์เพื่อเก็บข้อมูลรูปภาพ

  isLoading: boolean = false;
  Data_image: any;

  imageForm!: FormGroup;
  Name_photo: string = ''; 
  Photo: File | undefined;
  
  constructor(private Constants: Constants,
               private route: ActivatedRoute,
               private http: HttpClient,
               private router : Router ,
               private formBuilder: FormBuilder,)
  {}

  // User_Id!: number;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.data =window.history.state.data;
      // this.printdata();
      this.imageForm = this.formBuilder.group({
        // User_Id: [''],  // ตรวจสอบว่า this.data มีค่าหรือไม่ก่อนใช้
        Name_photo: [''],
        Photo: ['']
      });
        
    });
    console.log(this.data);
    this.myphoto(this.data.User_Id);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async myphoto(User_Id : any) {
    const url = this.Constants.API_ENDPOINT+'/myPhoto/User_Id?User_Id='+User_Id;
    // ส่งคำขอ GET ไปยัง URL ที่มีค่า User_Id แทนใน URL
    this.http.get(url).subscribe((response: any) => {
      this.constants = response; // กำหนดค่า constants เป็นข้อมูลรูปภาพที่ได้รับจากเซิร์ฟเวอร์
      console.log("Image User :",this.constants); // แสดงข้อมูลรูปภาพในคอนโซล
    });

      this.isLoading = true;
      await this.delay(2000); // รอเวลา 5 วินาที
      this.isLoading = false;
  }

  isModelOpen: boolean = false;

  //get data inage
  EditPhoto(ImageID: number) {
    console.log(ImageID);
    const dataimage = this.Constants.API_ENDPOINT+'/DataPhoto/data/'+ ImageID;
    this.http.get(dataimage).subscribe((Data:any)=>{
      this.Data_image = Data ;
      console.log("Data_image :",this.Data_image);
      
    });
    this.isModelOpen = true;
    // this.Edit(ImageID);
    
  }

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.imageForm.patchValue({
        Photo: file
      });
    }
  }


  //edit image
  Edit(ImageID: number) {

    if (!this.Name_photo) {
      alert('Please enter the photo name.'); // แสดงแจ้งเตือนถ้าชื่อรูปภาพไม่ถูกกรอก
      return; // หยุดการดำเนินการต่อไป
  }

    const fileInput = document.getElementById('Photo') as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert('Please select an image file');
      return;
    }
  
    const formData = new FormData();
    formData.append('Name_photo', (document.getElementById('Name_photo') as HTMLInputElement).value);
    formData.append('Photo', fileInput.files[0]);
  
    const urledit = this.Constants.API_ENDPOINT+'/edit/Image/'+ ImageID;
    this.http.put(urledit,formData).subscribe(
      response => {
        console.log('save Image successfully:', response);
        alert(' save Image successfully!');
        location.reload();
      },
      error => {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading image.');
      }
    );
  }
  

  imageUrl: string | null = null;

  FileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file); // ตรวจสอบไฟล์ที่ได้รับ
    const reader = new FileReader();
    reader.onload = (e: any) => {
        console.log(e.target.result); // ตรวจสอบข้อมูล URL ของรูปภาพ
        this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
}

  async closeModel() {
    // เปลี่ยนสถานะเป็นปิดเพื่อปิดโมเดล
    this.isModelOpen = false;
        this.isLoading = true;
        await this.delay(2000); // รอเวลา 5 วินาที
        this.isLoading = false;
   
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

import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Constants } from '../../config/constants';
import { modelUser } from '../../model/models';
import { FormBuilder,Validators,FormGroup, FormControl, FormsModule  } from '@angular/forms';
import {  ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-myprofile-upload-photo',
  standalone: true,
  imports: [MatCardModule,
            MatInputModule,
            MatButtonModule,
            RouterModule,
            HttpClientModule,
            CommonModule,
            ReactiveFormsModule,
            FormsModule],
  templateUrl: './myprofile-upload-photo.component.html',
  styleUrl: './myprofile-upload-photo.component.scss'
})

export class MyprofileUploadPhotoComponent {
    data: any;
    Data: any;
    imageForm!: FormGroup;
    User_Id: any;
    Name_photo: string = ''; 
    Photo: File | undefined;
  
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
        this.imageForm = this.formBuilder.group({
          User_Id: [''],  // ตรวจสอบว่า this.data มีค่าหรือไม่ก่อนใช้
          Name_photo: [''],
          Photo: ['']
        });
      });
    }

    imageUrl: string | null = null;
    //แสดงรูปที่เลือก
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
  
    onFileSelected(event: any): void {
      const file = (event.target as HTMLInputElement).files?.item(0);
      if (file) {
        this.imageForm.patchValue({
          Photo: file
        });
      }
    }
  
    upload() {

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
      formData.append('User_Id', this.data); // ตรวจสอบว่า this.data มีค่าหรือไม่ก่อนใช้
      formData.append('Name_photo', this.Name_photo); // ใช้ค่าจาก formControl ที่กำหนดไว้ใน imageForm
      formData.append('Photo', fileInput.files[0]);
  
      const url = `${this.Constants.API_ENDPOINT}/upload`;
      this.http.post<any>(url, formData).subscribe(
        response => {
          console.log('Image uploaded successfully:', response);
          alert('Image uploaded successfully!');
          location.reload();
        },
        error => {
          console.error('Error uploading image:', error);
          alert('An error occurred while uploading image.');
        }
      );
      this.back();
    }

    back() {
        const url = this.Constants.API_ENDPOINT + '/getdata/read/' + this.data;
        this.http.get(url).subscribe((dataPerson: any) => {
          this.Data = dataPerson;
          // console.log(this.Data);
          // ทำการเรียก navigate หลังจากที่ได้รับข้อมูลแล้ว
          this.router.navigate(['/myprofile'], { state: { data: this.Data[0] } });
          this.router.navigate(['/myprofile/post'], { state: { data: this.Data[0] } });
        });
      }
      
  }
  



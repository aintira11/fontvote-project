import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Constants } from '../../config/constants';
import { modelUser } from '../../model/models';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,
            MatInputModule,
            MatCardModule,
            MatIconModule, 
            MatToolbarModule,
          MatButtonModule,
          HttpClientModule,
          FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
Name: string="";
UserName: string="";
Email: string="";
constants: modelUser [] = [];
userForm!: FormGroup;
Avatar: File | undefined;
data: any;
Data_User: any;
Password: any;
  Data: any;

  constructor(private Constants: Constants, private route: ActivatedRoute, private http: HttpClient,private router : Router, private formBuilder: FormBuilder,) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.data = window.history.state.data;
      this.dataprifile(this.data);

      this.userForm = this.formBuilder.group({
        // User_Id: [''],  // ตรวจสอบว่า this.data มีค่าหรือไม่ก่อนใช้
        UserName: [''],
        Name: [''],
        Email:[''],
        Avatar:[''],
        Password:['']
      });
    });
    console.log("data edit profile",this.data); 
  }

  
  frofile(User_Id: number) {
    const fileInput = document.getElementById('Avatar') as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert('Please select an image file');
      return;
    }
    const formData = new FormData();
    formData.append('UserName', (document.getElementById('UserName') as HTMLInputElement).value);
    formData.append('Name', (document.getElementById('Name') as HTMLInputElement).value);
    formData.append('Email', (document.getElementById('Email') as HTMLInputElement).value);
    formData.append('Password', (document.getElementById('Password') as HTMLInputElement).value);
    formData.append('Avatar', fileInput.files[0]);

    const urledituser = this.Constants.API_ENDPOINT+'/editUser/'+ User_Id;
    this.http.put(urledituser,formData).subscribe(
      response => {
        console.log('save Image successfully:', response);
        alert(' save Frofile successfully!');
        // location.reload();
        //goback
      },
      error => {
        console.error('Error frofile edit:', error);
        alert('Your password may be incorrect.');
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
  
    dataprifile(User_Id:number){
      const dataimage = this.Constants.API_ENDPOINT+'/getdata/read/'+ User_Id;
      this.http.get(dataimage).subscribe((Data:any)=>{
        this.Data_User = Data ;
        console.log("Data_User : ",this.Data_User);
        
      });
    }

    back() {
        // ทำการเรียก navigate หลังจากที่ได้รับข้อมูลแล้ว
        this.router.navigate(['/myprofile'], { state: { data: this.Data_User[0] } });
        this.router.navigate(['/myprofile/post'], { state: { data: this.Data_User[0] } });
      
    }
  
}

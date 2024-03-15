import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Constants } from '../../config/constants';
// import { modelUser } from '../../model/models';
import { ModelImage } from '../../model/models';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule ,FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editupload',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './editupload.component.html',
  styleUrl: './editupload.component.scss'
})
export class EdituploadComponent implements OnInit{

    data: any;
    Data: any;
    imageForm!: FormGroup;
    ImageID: any;
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
        ImageID: [''],  // ตรวจสอบว่า this.data มีค่าหรือไม่ก่อนใช้
        Name_photo: [''],
        Photo: ['']
      });
    });
    this.print(this.data);
  }

  print(ImageID : any) {
    console.log("ImageID :" , ImageID);
    
    const url = this.Constants.API_ENDPOINT+'/DataPhoto/data/'+ ImageID;
    this.http.get(url).subscribe((response: any) => {
      this.Data = response; 
      console.log(this.Data); 
    });
  }

  editPhoto() {
    const url = this.Constants.API_ENDPOINT+'/update/edit/';
    }

}

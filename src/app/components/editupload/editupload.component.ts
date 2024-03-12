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

@Component({
  selector: 'app-editupload',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    HttpClientModule,
    CommonModule],
  templateUrl: './editupload.component.html',
  styleUrl: './editupload.component.scss'
})
export class EdituploadComponent implements OnInit{
  data: any;

  constructor(private Constants: Constants, private route: ActivatedRoute, private http: HttpClient,private router : Router) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.data =window.history.state.data;
        // this.printdata();
          
      });
      console.log(this.data);
  }

}

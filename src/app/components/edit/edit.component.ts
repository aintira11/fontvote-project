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

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,
            MatInputModule,
            MatCardModule,
            MatIconModule, 
            MatToolbarModule,
          MatButtonModule,
          HttpClientModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
    
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

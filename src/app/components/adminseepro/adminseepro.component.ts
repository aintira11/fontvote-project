import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HeaderMyprofileComponent } from '../header-myprofile/header-myprofile.component';

import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-adminseepro',
  standalone: true,
  imports: [CommonModule,HeaderMyprofileComponent,MatToolbar,
    MatIconModule, RouterModule,MatButtonModule],
  templateUrl: './adminseepro.component.html',
  styleUrl: './adminseepro.component.scss'
})
export class AdminseeproComponent {
  constructor(private location: Location){

  }
  goback() {
    this.location.back();
  }

}



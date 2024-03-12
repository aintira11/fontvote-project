import { Component } from '@angular/core';
import { HeaderMyprofileComponent } from '../header-myprofile/header-myprofile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profileperson',
  standalone: true,
  imports: [HeaderMyprofileComponent,
            MatToolbarModule,
            MatIconModule,
            RouterModule,
           MatButtonModule],
  templateUrl: './profileperson.component.html',
  styleUrl: './profileperson.component.scss'
})
export class ProfilepersonComponent {
goback() {
throw new Error('Method not implemented.');
}

}

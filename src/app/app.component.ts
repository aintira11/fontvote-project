import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            MyprofileComponent,
            RouterModule,
            MainComponent,
            HttpClientModule
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Project-vote';
  // title = 'MineCraft-Math ';
}

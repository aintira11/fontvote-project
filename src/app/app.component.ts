import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            MyprofileComponent,
            RouterModule,
            MainComponent,
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Project-vote';
  // title = 'MineCraft-Math ';
}

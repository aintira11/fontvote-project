import { Routes } from '@angular/router';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { MyprofilePostComponent } from './components/myprofile-post/myprofile-post.component';
import { MyprofileUploadPhotoComponent } from './components/myprofile-upload-photo/myprofile-upload-photo.component';
import { MyprofileStatisticsoComponent } from './components/myprofile-statisticso/myprofile-statisticso.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { MenbershipComponent } from './components/menbership/menbership.component';
import { EditComponent } from './components/edit/edit.component';
import { EdituploadComponent } from './components/editupload/editupload.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminseeproComponent } from './components/adminseepro/adminseepro.component';
import { ProfilepersonComponent } from './components/profileperson/profileperson.component';

export const routes: Routes = [
  {path: '',component: MainComponent},
  {path: 'login',component: LoginComponent},
  {path: 'edit',component: EditComponent},
  {path: 'editphoto',component: EdituploadComponent},
  {path: 'members',component: MenbershipComponent},
  {path: 'admin',component: AdminComponent},
  {path: 'adsee',component: AdminseeproComponent},
  { path: 'upload', component: MyprofileUploadPhotoComponent },
  { path: 'statistics', component: MyprofileStatisticsoComponent },
  { path: 'profilePerson', component: ProfilepersonComponent },
  { 
    path: 'myprofile',
    component: MyprofileComponent,
    children: [
	    { path: 'post', component: MyprofilePostComponent },
     
    //   { path: 'test/:id', component: TestComponent },
    ],
  },
];

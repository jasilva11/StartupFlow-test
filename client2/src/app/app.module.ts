// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

// Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PhotoMainComponent } from './photo/photo-main/photo-main.component';
import { PhotoCreateComponent } from './photo/photo-create/photo-create.component';
import { PhotoDetailsComponent } from './photo/photo-details/photo-details.component';

// Services
import { MainService } from './services/main.service';

const appRoutes: Routes = [
  { path: 'photo/main',      component: PhotoMainComponent },
  { path: 'photo/create',      component: PhotoCreateComponent },
  { path: 'photo/details/:photo_id',      component: PhotoDetailsComponent },
  { path: '',
    redirectTo: '/photo/main',
    pathMatch: 'full'
  },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    PhotoMainComponent,
    PhotoCreateComponent,
    PhotoDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ImageUploadModule.forRoot()
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }

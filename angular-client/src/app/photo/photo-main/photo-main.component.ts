import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-photo-main',
  templateUrl: './photo-main.component.html',
  styleUrls: ['./photo-main.component.css']
})
export class PhotoMainComponent implements OnInit {

  p = 1;
  public photos: any[];

  constructor(
    public mainService: MainService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.getPhotos();
  }

  ngOnInit() {
  }

  public getPhotos() {
    this.mainService.get('api/photo').subscribe(result => {
      this.photos = result;
      this.spinner.hide();
    });
  }
}

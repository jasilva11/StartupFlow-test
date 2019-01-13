import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ViewChild } from '@angular/core';
import { DatePipe  } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { } from 'googlemaps';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  public photoId: string;
  public photo = {image: '', title: '', date: undefined, time: '', format: '', location: {lat: undefined, lng: undefined}};
  public formatedDate = '';

  constructor(
    public mainService: MainService,
    public route: ActivatedRoute,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.photoId = this.route.snapshot.params['photo_id'];
    this.spinner.show();
    this.getPhoto();
  }

  ngOnInit() {
    const latLng = new google.maps.LatLng(4.710988599999999, -74.072092);
    const mapProp = {
      center: latLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  public formatDate(raw) {
    return new DatePipe('en-EN').transform(raw, 'dd MMM yyyy');
  }

  public getPhoto() {
    this.mainService.get('api/photo/' + this.photoId).subscribe(result => {
      if (result._id) {
        this.photo = result;
        console.log(this.photo);
        this.formatedDate = this.formatDate(this.photo.date);
        if (this.photo.location && this.photo.location.lat) {
          const center = new google.maps.LatLng(this.photo.location.lat, this.photo.location.lng);
          const marker = new google.maps.Marker({
            position: center,
            map: this.map
          });
          this.map.panTo(center);
        }
        this.spinner.hide();
      }
    });
  }
}

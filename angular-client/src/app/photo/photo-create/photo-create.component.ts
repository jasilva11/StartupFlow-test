import { Component, OnInit } from '@angular/core';
import { FileHolder, UploadMetadata } from 'angular2-image-upload';
import { MainService } from '../../services/main.service';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe  } from '@angular/common';
import { ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { } from 'googlemaps';

interface FileWithDate extends File {
    lastModified: any;
}

@Component({
  selector: 'app-photo-create',
  templateUrl: './photo-create.component.html',
  styleUrls: ['./photo-create.component.css']
})
export class PhotoCreateComponent implements OnInit {

  customStyle = {
    previewPanel: {
      'display': 'none'
    }
  };

  public photoTitle = 'Photo title';
  public photoFormat = '';
  public photoDate: Date;
  public photoDateStr = '';
  public photoTime = '';
  public photoImg = 'http://placehold.it/150x150';
  public address = '';
  public photoLat: number;
  public photoLng: number;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  geocoder: google.maps.Geocoder;
  marker: google.maps.Marker;

  constructor(
    public mainService: MainService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    const latLng = new google.maps.LatLng(4.710988599999999, -74.072092);
    const mapProp = {
      center: latLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.geocoder = new google.maps.Geocoder();
  }

  public formatDate(raw) {
    return new DatePipe('en-EN').transform(raw, 'dd MMM yyyy');
  }

  public formatTime(raw) {
    return new DatePipe('en-EN').transform(raw, 'HH:mm');
  }

  public onRemoved(file: FileHolder) {
    this.photoTitle = 'Photo title';
    this.photoImg = 'http://placehold.it/750x500';
  }

  public onUploadFinished(file: FileHolder) {
    const fileWithDate = <FileWithDate>file.file;
    const name = file.file.name.split('.');
    name.pop();
    this.photoTitle = name.join();
    this.photoDate =  new Date(fileWithDate.lastModified);
    this.photoDateStr = this.formatDate(this.photoDate);
    this.photoTime = this.formatTime(this.photoDate);
    this.photoFormat = file.file.type;
    this.photoImg = file.src;
  }

  public geocodeAddress(geocoder, resultsMap) {
    const obj = this;
    geocoder.geocode({'address': this.address}, function(results, status) {
      if (status === 'OK') {
        if (this.marker) {this.marker.setMap(null); }
        resultsMap.setCenter(results[0].geometry.location);
        this.marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        obj.photoLat = results[0].geometry.location.lat();
        obj.photoLng = results[0].geometry.location.lng();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  public onCreate() {
    this.spinner.show();
    const newPhoto = {
      image: this.photoImg,
      title: this.photoTitle,
      format: this.photoFormat,
      location: {lat: this.photoLat, lng: this.photoLng},
      date: this.photoDate,
      time: this.photoTime
    };
    this.mainService.post('api/photo', newPhoto).subscribe(result => {
      if (result._id) {
        this.spinner.hide();
        this.router.navigate(['/photo/details/' + result._id]);
      }
    });
  }
}

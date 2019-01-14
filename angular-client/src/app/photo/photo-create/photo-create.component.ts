import { Component, OnInit } from '@angular/core';
import { FileHolder, UploadMetadata } from 'angular2-image-upload';
import { MainService } from '../../services/main.service';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe  } from '@angular/common';
import { ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
declare var EXIF: any;
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

  public toDecimal (number) {
    return number[0].numerator + number[1].numerator / (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
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
    this.photoFormat = file.file.type;
    this.photoImg = file.src;
    const obj = this;
    EXIF.getData(file.file, function() {
      const metadata = EXIF.getAllTags(this);
      if (metadata.dateInfo) {
        const dateInfo = metadata.DateTime.replace(' ', ':').split(':');
        obj.photoDate =  new Date(parseFloat(dateInfo[0]), parseFloat(dateInfo[1]) - 1, parseFloat(dateInfo[2]),
          parseFloat(dateInfo[3]), parseFloat(dateInfo[4]), parseFloat(dateInfo[5]));
        obj.photoDateStr = obj.formatDate(obj.photoDate);
        obj.photoTime = obj.formatTime(obj.photoDate);
      }
      if (metadata.GPSLatitude && metadata.GPSLongitude) {
        if (obj.marker) { obj.marker.setMap(null); }
        const latLng = new google.maps.LatLng(obj.toDecimal(metadata.GPSLatitude), obj.toDecimal(metadata.GPSLongitude));
        obj.marker = new google.maps.Marker({
          map: obj.map,
          position: latLng
        });
        obj.map.panTo(latLng);
      }
    });
  }

  public geocodeAddress(geocoder, resultsMap) {
    const obj = this;
    geocoder.geocode({'address': this.address}, function(results, status) {
      if (status === 'OK') {
        if (obj.marker) {obj.marker.setMap(null); }
        resultsMap.setCenter(results[0].geometry.location);
        obj.marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
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
      location: {lat: this.marker.getPosition().lat(), lng: this.marker.getPosition().lng()},
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

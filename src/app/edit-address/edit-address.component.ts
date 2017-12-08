import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare let $: any;

interface AddressResponse {
  results: any;
  error_message: any
}

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  address = {
    street: '',
    ward: '',
    district: '',
    city: '',
    country: ''
  };
  key: any;
  error: any;
  database: any;
  addressForm: FormGroup;
  addressString = '';
  lat: number = 10.762622;
  lng: number = 106.660172;
  constructor(private http: HttpClient, private db: AngularFireDatabase, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.createForm();
    this.database = db.list('address');
    this.activatedRoute.params.subscribe(params => {
      this.key = params['key'];
      db.object('/address/' + this.key).valueChanges().subscribe(data => {
        let temp: any = data;
        this.address = temp;
      })
    });
  }

  ngOnInit() {
  }

  //init form data
  createForm() {
    this.addressForm = this.fb.group({
      street: '',
      ward: '',
      district: '',
      city: '',
      country: ''
    });
  }

  //action when user click on maps
  placeMarker = ($event) => {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.http.get<AddressResponse>('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.lat + ',' + this.lng + '&sensor=false').subscribe
      (data => {
        console.log(data);
        if (data.results[0]) {
          this.addressString = data.results[0].formatted_address;
          $("#comfirmModal").modal('show');
        } else {
          this.error = data.error_message;
          $("#errorModal").modal('show');
        }
      });
  }

  //save address via form
  onSubmit = () => {
    if (!this.address.street.trim()) {
      return;
    } else if (!this.address.city && (!this.address.ward || !this.address.district)) {
      return;
    } else {
      this.database.update(this.key, this.address).then(_ => this.router.navigateByUrl(''));
    }
  }

  //save address via map
  saveAddress = () => {
    var temp = this.addressString.split(',');
    this.address.street = temp[0];
    this.address.ward = temp[1];
    this.address.district = temp[2];
    this.address.city = temp[3];
    this.address.country = temp[4];
    this.database.update(this.key, this.address).then(_ => {
      this.router.navigateByUrl('');
      $("#comfirmModal").modal('hide');
    });
  }

}

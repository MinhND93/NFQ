import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { Constant } from '../common/constant';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { loadavg } from 'os';
declare let $: any;

//Interface for reponse
interface AddressResponse {
  results: any;
  error_message: any
}

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})

export class AddAddressComponent implements OnInit {
  //init initial value
  address = {
    street: '',
    ward: '',
    district: '',
    city: '',
    country: ''
  };
  error: any;
  database: any;
  addressForm: FormGroup;
  addressString = '';
  lat: number = 10.762622;
  lng: number = 106.660172;

  constructor(private http: HttpClient, private db: AngularFireDatabase, private fb: FormBuilder,
    private router: Router, private loading: Ng4LoadingSpinnerService, private toastService: ToastyService, private toastConfig: ToastyConfig) {
    //Init database and form
    this.createForm();
    this.database = db.list(Constant.DATABASE);
    this.toastConfig.theme = 'material';
    navigator.geolocation.getCurrentPosition( location => {
      this.lat = location.coords.latitude;
      this.lng = location.coords.longitude;
    })
  }

  ngOnInit() {
  }

  //action when user click on maps
  placeMarker = ($event) => {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    //show loading
    this.loading.show();
    this.http.get<AddressResponse>(Constant.GOOGLE_MAP_API + this.lat + ',' + this.lng + '&sensor=false').subscribe
      (data => {
        if (data.results[0]) {
          this.addressString = data.results[0].formatted_address;
          $("#comfirmModal").modal('show');
        } else {
          this.error = data.error_message;
          $("#errorModal").modal('show');
        }
        //hide loading
        this.loading.hide();
      });
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

  //userCurrentLocation
  useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition( location => {
      this.lat = location.coords.latitude;
      this.lng = location.coords.longitude;
      this.http.get<AddressResponse>(Constant.GOOGLE_MAP_API + this.lat + ',' + this.lng + '&sensor=false').subscribe
      (data => {
        if (data.results[0]) {
          this.addressString = data.results[0].formatted_address;
          $("#comfirmModal").modal('show');
        } else {
          this.error = data.error_message;
          $("#errorModal").modal('show');
        }
        //hide loading
        this.loading.hide();
      });
    })
  }
  //save address via form
  onSubmit = () => {
    if (!this.address.street.trim()) {
      return;
    } else if (!this.address.city && (!this.address.ward || !this.address.district)) {
      return;
    } else {
      this.database.push(this.address).then(_ => {
        this.router.navigateByUrl('');
        this.toastService.success(Constant.ADD_SUCCESS);
      });
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
    this.database.push(this.address).then(_ => {
      //Navigate to list page
      this.router.navigateByUrl('');
      $("#comfirmModal").modal('hide');
      this.toastService.success(Constant.ADD_SUCCESS);
    });
  }
}

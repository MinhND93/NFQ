import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {
  listAddress = [];
  list: any;
  constructor(private router : Router, private db: AngularFireDatabase) { 
    db.list('address').snapshotChanges().subscribe(data => {
      data.forEach(result => {
        this.listAddress.push({
          key: result.key,
          street: result.payload.val().street,
          ward: result.payload.val().ward,
          district: result.payload.val().district,
          city: result.payload.val().city,
          country: result.payload.val().country,
        })
      })
    })
  }
  
  ngOnInit() {
  }

  addNewAddress = () => {
    this.router.navigateByUrl('/add');
  }

  editAddress = (address) => {
    this.router.navigateByUrl('/edit/' + address.key)
  }

  //Export list to csv
  exportToCsv = () => {
    var exportData = [];
    for (var i = 0; i < this.listAddress.length; i++){
      var temp = {
        street: this.listAddress[i].street,
        ward: this.listAddress[i].ward,
        district: this.listAddress[i].district,
        city: this.listAddress[i].city,
        country: this.listAddress[i].country
      }
      exportData.push(temp);
    }

    var header = ["Street", "Ward", "District", "City", "Country"];
   
    new Angular2Csv(exportData, 'Address', {headers: header});
  } 
}

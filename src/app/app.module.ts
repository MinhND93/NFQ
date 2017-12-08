import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { ListAddressComponent } from './list-address/list-address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { HeaderComponent } from './common/header.component'

import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

export const firebaseConfig = {
  apiKey: "AIzaSyBnrVQ5EgwO-Cuf_SV5qrkieVeaLUemu8E",
  authDomain: "nfqtest-b376a.firebaseapp.com",
  databaseURL: "https://nfqtest-b376a.firebaseio.com",
  projectId: "nfqtest-b376a",
  storageBucket: "nfqtest-b376a.appspot.com",
  messagingSenderId: "111402370454"
};

const routes: Routes = [
  { path: '', component: ListAddressComponent },
  { path: 'add', component: AddAddressComponent },
  { path: 'edit/:key', component: EditAddressComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListAddressComponent,
    AddAddressComponent,
    EditAddressComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDyIP6k_ino2M0Qy4yftdr1OAmE651NIgs'
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

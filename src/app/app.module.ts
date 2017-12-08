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
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AgmCoreModule } from '@agm/core';
import { Constant } from './common/constant';

export const firebaseConfig = {
  apiKey: Constant.FIREBASE_KEY,
  authDomain: Constant.FIREBASE_AUT_DOMAIN,
  databaseURL: Constant.FIREBASE_DATABASE_URL,
  projectId: Constant.PROJECT_ID,
  storageBucket: Constant.STORAGE_BUCKET,
  messagingSenderId: Constant.MESSENGING_SENDER_ID
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
      apiKey: Constant.AGM_KEY
    }),
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

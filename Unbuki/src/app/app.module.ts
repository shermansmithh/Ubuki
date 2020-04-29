import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {FIREBASE_CONFIG} from'./enviroment';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import { AddbooksPage} from '../pages/addbooks/addbooks'
import {RegisterPage}from '../pages/register/register'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebaeConfig from  './firebase';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth'
import {BooksdetailsPage} from '../pages/booksdetails/booksdetails'
import {HttpClientModule} from '@angular/common/http';
import {PayPal} from '@ionic-native/paypal/'
import { FontprovProvider } from '../providers/fontprov/fontprov';
import {ForgetPage} from '../pages/forget/forget';
import { AccesPage} from '../pages/acces/acces';
import {AcsdetailsPage} from '../pages/acsdetails/acsdetails'

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    AddbooksPage,
    BooksdetailsPage,
    RegisterPage,
    ForgetPage,
    AccesPage,

    AcsdetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaeConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    AddbooksPage,
    BooksdetailsPage,
    RegisterPage,
    ForgetPage,
    AccesPage,

    AcsdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PayPal,
    FontprovProvider
   
  ]
})
export class AppModule {}

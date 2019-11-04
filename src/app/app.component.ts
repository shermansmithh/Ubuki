import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, NavController } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { HttpClient } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AddbooksPage } from '../pages/addbooks/addbooks';
import { BooksdetailsPage } from '../pages/booksdetails/booksdetails';
import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: any;
  user: any;
  userId: string = "null"

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private http: HttpClient,

  ) {
    this.initializeApp();

    // Get user UID from firebase



    // set our app's pages
    // this.pages = [
    //   { title: 'Hello Ionic', component: HelloIonicPage, src: '' },
    //   { title: 'My First List', component: ListPage, src: '' },
    //   { title: 'add', component: AddbooksPage, src: '' }
    // ];

  }

  initializeApp() {
    var vm = this
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getBooks()
     
    
      if (firebase.auth().currentUser !== null){
        this.userId = firebase.auth().currentUser.uid;
        this.initUser();
      }
     

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          vm.userId = firebase.auth().currentUser.uid;
          vm.initUser();
        } else {
          // User not logged in or has just logged out.
        }
      });

    });

  }

  openPage(item) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    // this.nav.setRoot(page.component);

    this.nav.push(BooksdetailsPage, {
      item: item
    });
  }

  getBooks() {
    var vm = this
    //Realtime database tracking of plus users
    firebase.database().ref('/books/').once('value', function (snapshot) {
      if (snapshot.exists) {
        var arr = Array.from(Object.keys(snapshot.val()), k => snapshot.val()[k]);
        vm.pages = arr
        console.log(snapshot.val())
      }
      else {
        console.log(snapshot.val())
      }
    });
  }

  addBook() {
    this.nav.setRoot(AddbooksPage);
  }

  initUser() {
    var vm = this
    //Realtime database tracking of actual user 
    firebase.database().ref('/profiles/' + this.userId).on('value', function (snapshot) {
      vm.user = snapshot.val()
      if ((snapshot.val() == undefined || null) || (snapshot.val().name == undefined)) {
        vm.initProfile()
      }
    });
  }

  // Init Profile
  initProfile() {


    var ref = firebase.database().ref();
    ref.child('profiles').child(this.userId = firebase.auth().currentUser.uid).update({
      uid: this.userId
    })

  }

}

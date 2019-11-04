import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the AddbooksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-addbooks',
  templateUrl: 'addbooks.html',
})
export class AddbooksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var pages = {
      1:{
        url:'',
        text: ''
      },
      2:{
        url:'',
        text: ''
      },
      3:{
        url:'',
        text: ''
      }
    }
    var ref = firebase.database().ref();
    var books = ref.child('books');
    var newBooksKey = firebase.database().ref().child('books').push().key;
    books.child(newBooksKey).set({
      bookId: newBooksKey,
      coverLink: '',
      author: '',
      amount:'',
      title:'',
      editor:'',
      illustrator:'',
      digitalProduction:'',
      imprenta:'',
      pages: pages
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbooksPage');
  }



}

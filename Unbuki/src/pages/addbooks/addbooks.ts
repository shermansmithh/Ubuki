import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
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
  selectedFile: ImageSnippet;
  selectedBook: any;
  coverLink: any
  author: any 
  amount: any
  title: any
  editor: any
  illustrator: any
  digitalProduction: any
  imprenta: any
  pagecount: any
  image: any
  pages: any
  voorword: any
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController) {
  
  }


  createBook(){
    var pages = {}
    var vm = this
    var ref = firebase.database().ref();
    var books = ref.child('books');
    var newBooksKey = firebase.database().ref().child('books').push().key;
    this.createPages(vm.pagecount)

    books.child(newBooksKey).update({  bookId: newBooksKey  ,
      author: vm.author ? vm.author : null,
      amount: vm.amount ? vm.amount : 'free',
      title: vm.title ? vm.title : null,
      editor: vm.editor ? vm.editor : null,
      illustrator: vm.illustrator ? vm.illustrator : "Explainerads.com",
      digitalProduction: vm.digitalProduction ? vm.digitalProduction: "Benjamin Smith",
      imprenta: vm.imprenta? vm.imprenta :"JCI IOBA Curaçao",
      coverLink : vm.image ? vm.image : null,
      voorword : vm.voorword ? vm.voorword : null,
      pages : vm.pages ? vm.pages: null }).then(function(){

      vm.toast.create({ message: "Book Is Uploaded In Database Succesfully", duration: 2000 }).present()
    }).catch(function(error) {
      vm.toast.create({ message: "Error By Uploading", duration: 2000 }).present()
    })


  }
  
  createPages(length){
    this.pages = []
 
    var pageObject= {}
    
    for(var i = 0; i < length; i++) {
      this.pages.push(pageObject[i] ={
        page: i +1,
        url:'',
       text: 'Sample Text '});
     }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbooksPage');
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.image = this.selectedFile.src
      
    });

    reader.readAsDataURL(file);
  }

}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
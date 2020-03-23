import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import undefined from 'firebase/empty-import';
import { P } from '@angular/core/src/render3';
/*
  Generated class for the FontprovProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FontprovProvider {
  public font: Observable<any>;
  public fontsize: Observable<any>;

  constructor(public http: HttpClient) {
    console.log('Hello FontprovProvider Provider');
  }


  setFontType(font) {
    this.font = new Observable((observer) => {
    
      observer.next(font)
      observer.complete()
    })
  }

  setFontSize(size) {
    this.fontsize = new Observable((observer) => {
     
      observer.next(size)
      observer.complete()
    })
  }

  getFont() {
    if(!this.font){
      return Observable.of('Open Sans');
    }
    return this.font
  }

  getFontSize() {
    if(!this.fontsize){
      return Observable.of('14');
    }
     return this.fontsize
  }
}

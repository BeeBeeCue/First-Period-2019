import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interfaces/pic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: Pic[] = [];
  mediaPath = 'assets/json/test.json';
  webMediaPath = 'http://media.mw.metropolia.fi/wbma/media';

  constructor(private http: HttpClient, public navCtrl: NavController) {

  }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.http.get<Pic[]>(this.webMediaPath).subscribe(
      (response: Pic[]) => {
        this.picArray = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  /*
  showImage(image){
    this.photoViewer.show(image);

    , private photoViewer: PhotoViewer
  }
  */

}



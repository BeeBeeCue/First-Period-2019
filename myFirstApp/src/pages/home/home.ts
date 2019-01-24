import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: Pic[] = [];
  mediaPath = 'assets/json/test.json';
  webMediaPath = 'http://media.mw.metropolia.fi/wbma/media';
  baseWebPath = 'http://media.mw.metropolia.fi/wbma/';

  constructor(
    private http: HttpClient,
    public navCtrl: NavController,
    public mediaProvider: MediaProvider) {

  }

  ngOnInit() {
    this.getImages();
  }

  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((data: Pic[]) => {
      console.log('data', data);
      // A:
      /*
      this.picArray = data.map((pic: Pic) => {
        const nameArray = pic.filename.split('.');
        console.log('nameArray', nameArray);
        pic.thumbnails = {
          160: nameArray[0] + '-tn160.png',
        };
        console.log('pic after', pic);
        return pic;
      });
      */
      // B:
      data.forEach((pic: Pic) => {
        // add files to picArray
        this.mediaProvider.getSingleMedia(pic.file_id).
          subscribe((file: Pic) => {
            this.picArray.push(file);
          });
      });
    });
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



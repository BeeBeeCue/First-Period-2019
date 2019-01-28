import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Media } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: Observable<Media[]>;
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';


  constructor(
    public navCtrl: NavController, private mediaProvider: MediaProvider) {

  }

  ngOnInit() {
    this.getAllFiles();
  }

  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((result: Media[]) => {
      this.picArray = this.mediaProvider.getAllMedia();
    });
  }

  showImage(fileId: number) {
    // this.photoViewer.show(image);
    this.mediaProvider.getSingleMedia(fileId).subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      },
    );
  }
}



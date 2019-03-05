import { MediaProvider } from '../../providers/media/media';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Media } from '../../interfaces/media';
import { Observable } from 'rxjs';
import { UploadPage } from '../upload/upload';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  mediaArray: Observable<Media[]>;

  uploadPage = UploadPage;

  constructor(
    public navCtrl: NavController, private mediaProvider: MediaProvider) {

  }

  ngOnInit() {
    this.getAllFiles();
  }

  getAllFiles() {
    this.mediaArray = this.mediaProvider.getAllMedia();
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

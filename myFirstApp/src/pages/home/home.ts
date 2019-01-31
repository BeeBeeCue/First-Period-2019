import { MediaProvider } from '../../providers/media/media';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Media } from '../../interfaces/pic';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  mediaArray: Observable<Media[]>;

  constructor(
    public navCtrl: NavController, private mediaProvider: MediaProvider) {

  }

  ngOnInit() {
    this.getAllFiles();
  }

  getAllFiles() {
    this.mediaArray = this.mediaProvider.getAllMedia();
    console.log('HELLOOOOOOOO');
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

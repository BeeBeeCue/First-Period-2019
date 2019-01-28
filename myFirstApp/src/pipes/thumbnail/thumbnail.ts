import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/pic';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
  // pure: false,
})
export class ThumbnailPipe implements PipeTransform {
  private thumbnail = '';
  private cahchedId;

  constructor(private mediaProvider: MediaProvider) {

  }

  /**
   * Takes a value and makes it lowercase.
   */
  transform(id: number, ...args) {
    console.log(args[0]);
    // impure version:
    /*
    if (this.cahchedId !== id) {
       this.cahchedId = id;
       this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
         switch (args[0]) {
           case 'large':
             this.thumbnail = response.thumbnails.w640;
             break;
           case 'medium':
             this.thumbnail = response.thumbnails.w320;
             break;
           case 'screenshot':
             this.thumbnail = response.screenshot;
             break;
           default:
             this.thumbnail = response.thumbnails.w160;
         }

       });
     }
     return this.thumbnail;
     */

    // pure version:
    return new Promise((resolve, reject) => {
      this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
        switch (args[0]) {
          case 'large':
            resolve(response.thumbnails.w640);
            break;
          case 'medium':
            resolve(response.thumbnails.w320);
            break;
          case 'screenshot':
            resolve(response.screenshot);
            break;
          default:
            resolve(response.thumbnails.w160);
        }
      });
    });
  }
}

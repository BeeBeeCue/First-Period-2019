import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/media';

/**
 * Generated class for the GetTagByUserPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'getTagByUser',
})
export class GetTagByUserPipe implements PipeTransform {
  constructor(public mediaProvider: MediaProvider) {

  }

  async transform(tag: string) {
    console.log(tag);
    return new Promise((resolve, reject) => {
      this.mediaProvider.getFilesByTag(tag).subscribe((files: Media[]) => {
        console.log("fffff uuuuuu");

        console.log(this.mediaProvider.user);

        files.forEach((file: Media) => {
          if (file.user_id === this.mediaProvider.user.user_id) {
            resolve(file.file_id);
          }
        });
      });
    });
  }
}

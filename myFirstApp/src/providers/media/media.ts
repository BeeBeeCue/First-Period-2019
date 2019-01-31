import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, Media, User } from '../../interfaces/pic';

@Injectable()
export class MediaProvider {

  mediaAPI = 'http://media.mw.metropolia.fi/wbma/';
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';

  loggedIn = false;

  user: User = null;

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    return this.http.get<Media[]>(this.mediaAPI + 'media');
  }

  getSingleMedia(id: number) {
    console.log(this.mediaAPI + id);
    return this.http.get<Media>(this.mediaAPI + 'media/' + id);
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(this.mediaAPI + 'login',
      user, httpOptions);
  }

  getFilesByTag(tag) {
    // single file
    return this.http.get<Media[]>(this.mediaAPI + 'tags/' + tag);
  }

  // TODO: Add methods for:
  // - checking if a username exist (http://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName)
  // - registration (http://media.mw.metropolia.fi/wbma/docs/#api-User-PostUser)

}

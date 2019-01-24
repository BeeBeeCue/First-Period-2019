import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, Pic, User } from '../../interfaces/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  mediaAPI = 'https://media.mw.metropolia.fi/wbma/';

  loggedIn = false;

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    return this.http.get<Pic[]>(this.mediaAPI + 'media');
  }

  getSingleMedia(id) {
    return this.http.get<Pic>(this.mediaAPI + 'media/' + id);
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    }; // TODO: add headers inside the object
    return this.http.post<LoginResponse>(this.mediaAPI + 'login', user, httpOptions);
  }
}

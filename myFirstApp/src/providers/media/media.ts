import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, Media, User } from '../../interfaces/media';

@Injectable()
export class MediaProvider {

  mediaAPI = 'http://media.mw.metropolia.fi/wbma/';
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';

  loggedIn = false;

  user: User = null;
  token = '';

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  // Getting all media in an array
  getAllMedia() {
    return this.http.get<Media[]>(this.mediaAPI + 'media');
  }

  // Getting single media
  getSingleMedia(id: number) {
    console.log(this.mediaAPI + id);
    return this.http.get<Media>(this.mediaAPI + 'media/' + id);
  }

  // Login
  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(this.mediaAPI + 'login',
      user, httpOptions);
  }

  // Need stuff
  // Checking if user exists
  checkUser(username: String) {
    console.log('Checking User');
    console.log(username);
    return this.http.get<User>(this.mediaAPI + 'users/username/' + username);

  }

  // Gets the file by tag
  getFilesByTag(tag) {
    return this.http.get<Media[]>(this.mediaAPI + 'tags/' + tag);
  }

  // Check the token
  checkToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.get<User>(this.mediaAPI + 'users/user',
      httpOptions);
  }

  // Upload function
  upload(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<LoginResponse>(this.mediaAPI + 'media',
      data, httpOptions);
  }

  // TODO: Add methods for:
  // - checking if a username exist (http://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName)
  // - registration (http://media.mw.metropolia.fi/wbma/docs/#api-User-PostUser)

}

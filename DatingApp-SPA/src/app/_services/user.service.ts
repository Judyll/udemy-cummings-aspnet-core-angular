import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// When we will be doing a request from the API, we also need to send-up the
// authorization token with the request.
// The http.get() method can also take some options and inside the options can be the
// headers like in Postman the 'Authorization' header

// We will only need this if we don't configure JwtModule in app.module.ts

// We will now create a header
//const httpOptions = {
//  headers: new HttpHeaders({
//    // Do not forget the 'space' after the 'Bearer'
//    'Authorization': 'Bearer ' + localStorage.getItem('token')
//  })
//}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // This is defined in the environment.ts
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    //return this.http.get<User[]>(this.baseUrl + 'users/', httpOptions);
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id): Observable<User> {
    //return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    // Since this is a post request, we are required to send a body.
    // We will be sending an empty object {}
    return this.http.post(this.baseUrl + 'users/' + userId +
      '/photos/' + id + '/setMain', {});
  }

}

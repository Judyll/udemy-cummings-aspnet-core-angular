import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

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

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    // This is query string the parameter that we are going to append when we will
    // call the the UsersController.GetUsers([FromQuery]UserParams userParams) endpoint
    let params = new HttpParams();

    // These are the same fields we have created in the DatingApp.API.Helpers.UserParams
    // class which is the parameter type in the UsersController.GetUsers([FromQuery]UserParams userParams)
    // endpoint.  The UserParams class uses its default value PageNumber = 1 and
    // PageSize = 10 if 'page' and 'itemsPerPage' are null
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    // Check if we have userParams
    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    //return this.http.get<User[]>(this.baseUrl + 'users/', httpOptions);
    //return this.http.get<User[]>(this.baseUrl + 'users');
    // We will now change what we are observing as part of the response
    // By specifying observe: 'response', we will now have access to the full
    // Http response and pass in the query string params.
    // Since we are not getting only the body back we need to do something
    // with the response by using .pipe which is a method that allows us access
    // to the rxjs operators.  The rxjs operator we will be using is the map operator
    // which applies a given project function to each value emitted by the source
    // Observable, and emits the resulting values as an Observable.
    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map(response => {
            // We are getting the Users[] array from the body of the response
          paginatedResult.result = response.body;
            // We are also getting the pagination information from the response headers
            // The headers returned by the UsersController.GetUsers([FromQuery]UserParams userParams)
            // contains Pagination →{"CurrentPage":1,"ItemsPerPage":10,"TotalItems":14,"TotalPages":2}
            // which is configured the DatingApp.API.Helpers.Extensions.AddPagination method
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }

          return paginatedResult;
        })
      );
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

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId +
      '/photos/' + id);
  }

  sendLike(id: number, recipientId: number) {
    // Since this is a post request, we are required to send a body.
    // We will be sending an empty object {}
    return this.http.post(this.baseUrl + 'users/' + id +
      '/like/' + recipientId, {});
  }

}

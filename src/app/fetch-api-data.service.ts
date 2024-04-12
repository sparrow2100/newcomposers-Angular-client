import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://women-composers-api.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  //Inject the HttpClient module to the constructor params (provide it to the entire class, making it available via this.http)
  constructor(private http: HttpClient) {}

  //USER REGISTRATION
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // USER LOGIN
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
  // GET ALL COMPOSERS
  public getAllComposers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // GET ONE COMPOSER
  // '/composers/:name', GET
  public getOneComposer(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'composers/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET ERA
  // '/eras/:eraName', GET
  public getOneEra(eraName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'eras/' + eraName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET INFO ABOUT ALL ERAS
  // '/eras', GET
  public getEras(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'eras', {
        headers: new HttpHeaders({
          Authorizatioin: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET USER
  // '/users/:username', GET
  public getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username);
    //const user = JSON.parse(localStorage.getItem('user) || '{}')
    //return user
  }

  // GET A USER'S FAVOURITE COMPOSERS
  // '/users/:username/favouriteComposers/', GET
  public getFavourites(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + username + '/favouriteComposers/', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ADD A COMPOSER TO FAVOURITE COMPOSERS
  // '/users/:username/favouriteComposers/:composerId', POST
  public addFavourite(
    username: string,
    composerId: string,
    userDetails: any
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(
        apiUrl + 'users/' + username + '/favouriteComposers/' + composerId,
        userDetails,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // EDIT USER INFO
  // '/users/:username', PUT
  public updateUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE USER
  // '/users/:username'
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE A COMPOSER FROM FAVOURITE COMPOSERS
  // '/users/:username/favouriteComposers/:composerId', DELETE
  public deleteFavourite(
    username: string,
    composerId: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(
        apiUrl + 'users/' + username + '/favouriteComposers/' + composerId,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //handle errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

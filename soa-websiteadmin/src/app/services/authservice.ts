import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {User} from '../dto/userdto';
import {MAIN_URL} from './itemservice';

const URL = 'api/v1/user/login';
const URLSIGN = 'api/v1/user/save';

@Injectable()
export class Authservice {

  constructor(private http: HttpClient, private router: Router) {

  }

  login(user: User): Observable<boolean> {
    return this.http.post<boolean>(MAIN_URL + URL, user)
      .pipe(map((result) => {
          sessionStorage.setItem('token', result + '');
          if (result) {
            this.router.navigate(['/route-item']);
          }
          return result;
        })
      );
  }

  signup(user: User): Observable<JSON> {
    return this.http.post<JSON>(MAIN_URL + URLSIGN, user)
      .pipe(map((result) => {
          sessionStorage.setItem('token', result + '');
          if (result) {
            this.router.navigate(['/route-item']);
          }
          return result;
        })
      );
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token') == 'false' ? false : true;
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/route-item']);
  }

  getUser(): void {
    sessionStorage.getItem('name');
  }
}

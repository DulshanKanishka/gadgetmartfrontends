import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

const URL = 'api/v1/user/login';
const URLSIGN = 'api/v1/user/save';

@Injectable()
export class Authservice {

  constructor(private http: HttpClient) {
  }


}

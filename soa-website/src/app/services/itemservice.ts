import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export const MAIN_URL = 'http://localhost:8090/';
const urls = 'api/v1/web/Ab';


@Injectable()
export class Itemservice {

    constructor(private http: HttpClient) { }

    getItemsList(): Observable<any> {
        return this.http.get(MAIN_URL + urls);
    }

}

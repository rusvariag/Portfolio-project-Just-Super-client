import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { commonUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  cityList = [
    { name: 'Jerusalem' },
    { name: 'Tel Aviv-Yafo' },
    { name: 'Haifa' },
    { name: 'Rishon LeZion' },
    { name: 'Petah Tikva' },
    { name: 'Ashdod' },
    { name: 'Netanya' },
    { name: 'Beersheba' },
    { name: 'Bnei Brak' },
    { name: 'Holon' },
  ];
  
  constructor(private http: HttpClient) { }

  getCommon(): Observable<any> {
    return this.http.get<any>(commonUrl);
  }

  getCities() {
    return this.cityList;
  }
}

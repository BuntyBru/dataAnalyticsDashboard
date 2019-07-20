import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class CountryOrdersMapService {

  constructor(private http: HttpClient) {}

  getCords(): Observable<any> {
    //console.log("This was used");
    return this.http.get('assets/leaflet-countries/countries.geo.json');
  }

}

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Observable } from 'rxjs';
import { Planet } from '../models/planet';

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  constructor(private http: HttpClient) { }

  getPeopleById(id?: number): Observable<Person[]> {
    return this.http.get<Person[]>('assets/responses/people.json');
  }

  getPlanetById(id?: number): Observable<Planet> {
    return this.http.get<Planet>('assets/responses/planet.json');
  }

}

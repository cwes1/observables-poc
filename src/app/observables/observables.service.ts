import { Injectable } from '@angular/core';
import { StarWarsApiService } from '../services/star-wars-api.service';
import { ReplaySubject, of, EMPTY, forkJoin, Observable } from 'rxjs';
import { mergeMap, catchError, tap, map, share, publishReplay, refCount } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor(private swapiService: StarWarsApiService) { }

  private routeParamSubject = new ReplaySubject<number>();
  routeParam$ = this.routeParamSubject.asObservable();


  people$ = this.routeParam$.pipe(
    tap(routeParam => console.log('routeParam: ', routeParam)),
    mergeMap(routeParam => this.swapiService.getPeopleById(routeParam)),
    publishReplay(1),
    refCount()
  );

  peopleNames$ = this.people$
    .pipe(
      map(people => people.map(person => person.name))
    );

  peopleHomeworlds$ = this.people$
    .pipe(
      map(people => people.map(person => person.homeworld))
    );

  peopleUpperCase$ = this.people$
    .pipe(
      map(people => people.map(person =>
        ({
          ...person,
          name: person.name.toUpperCase()
        }) as Person)
      )
    );
  
  planet$ = this.swapiService.getPlanetById();

  emitRouteParam(routeParam: number) {
    this.routeParamSubject.next(routeParam);
  }
}

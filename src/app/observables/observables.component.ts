import { Component, OnInit } from '@angular/core';
import { ObservablesService } from './observables.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit {

  people$ = this.service.people$.pipe(tap(people => console.log('people: ', people)));
  peopleUpper$ = this.service.peopleUpperCase$.pipe(tap(peopleUpper => console.log('peopleUpper: ', peopleUpper)));
  peopleNames$ = this.service.peopleNames$.pipe(tap(peopleNames => console.log('peopleNames: ', peopleNames)));

  constructor(private service: ObservablesService) { }

  ngOnInit() {
    // simulating route param emission
    this.service.emitRouteParam(1);
  }

}

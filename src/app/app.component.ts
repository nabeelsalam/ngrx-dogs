import { Component, ViewChild } from '@angular/core';
import { DogService } from './dogService/dogService.service';
import { Observable } from 'rxjs/Observable';
import { filter, map, tap } from 'rxjs/operators';

import { DogsList } from './dogsList/dogsList.component';

//ngrx
import { Store } from '@ngrx/store';
import * as Actions from './store/dogs/dogs.actions';
import * as Reducers from './store/dogs/dogs.reducers';

interface DogsResponseType {
  status: String,
  message: String[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'Dogs Database';
  dogs$: Observable<String[]>;
  images$: Observable<String[]>;
  selected$: Observable<String>;

  get timeFormat() {
    return 'medium';
  }

  @ViewChild(DogsList)
  private dogsListComp: DogsList;

  counter: Observable<String>;

  constructor(private store: Store<any>, private dogSvc: DogService) {
  }

  ngOnInit() {
    this.createDogsListAndGallery('');
    this.selected$ = this.store.select(Reducers.getSelected);
    this.counter = this.dogSvc.getCounter();
    this.dogs$ = this.store.select(Reducers.getDogs);
    this.images$ = this.store.select(Reducers.getDogImages);
  }

  createDogsListAndGallery(filter) {
    this.store.dispatch(new Actions.GetDogsAction(filter));
  }

  dogSelected(breed) {
    this.store.dispatch(new Actions.GetDogImagesAction(breed));
    this.store.dispatch(new Actions.DogSelectedAction(breed));
  }

  filterDogsList(value) {
    this.createDogsListAndGallery(value)

  }

}

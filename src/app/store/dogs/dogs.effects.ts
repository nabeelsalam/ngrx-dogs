import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable'
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { DogService } from '../../dogService/dogService.service';
import * as DogActions from "./dogs.actions";

@Injectable()
export class DogEffects {
    constructor(
        private actions$: Actions,
        private dogSvc: DogService,
    ) { }

    @Effect()
    loadDogs$: Observable<Action> = this.actions$
        .ofType(DogActions.GET_DOGS)
        .switchMap((action: any) => this.dogSvc.getListOfDogBreeds(action.payload))
        .switchMap(data => [
            new DogActions.GetDogsSuccessAction(data),
            new DogActions.DogSelectedAction(data[0]),
            new DogActions.GetDogImagesAction(data[0])
        ])

    @Effect()
    loadDogImages$: Observable<Action> = this.actions$
        .ofType(DogActions.GET_DOG_IMAGES)
        .switchMap((action: any) => this.dogSvc.getBreedImages(action.payload))
        .map((data: any) => new DogActions.GetDogImagesSuccessAction(data))


}
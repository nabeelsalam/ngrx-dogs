import { Action } from '@ngrx/store';

export const DOG_SELECTED = 'Dogs.DogSelected'
export const GET_DOGS = 'Dogs.GetDogs';
export const GET_DOGS_SUCCESS = 'Dogs.GetDogsSuccess';
export const GET_DOG_IMAGES = 'Dogs.GetDogImages';
export const GET_DOG_IMAGES_SUCCESS = 'Dogs.GetDogImagesSuccess';

export class DogSelectedAction implements Action {
    readonly type = DOG_SELECTED;

    constructor(public payload: string) { }
}

export class GetDogsAction implements Action {
    readonly type = GET_DOGS;

    constructor(public payload: string) { }
}

export class GetDogsSuccessAction implements Action {
    readonly type = GET_DOGS_SUCCESS;

    constructor(public payload: string[]) { }
}

export class GetDogImagesAction implements Action {
    readonly type = GET_DOG_IMAGES;

    constructor(public payload: string) { }
}

export class GetDogImagesSuccessAction implements Action {
    readonly type = GET_DOG_IMAGES_SUCCESS;

    constructor(public payload: string[]) { }
}

export type All = DogSelectedAction | GetDogsAction | GetDogsSuccessAction | GetDogImagesAction | GetDogImagesSuccessAction;
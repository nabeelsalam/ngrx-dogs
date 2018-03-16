import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class DogService {
    getListOfDogBreedsUrl = 'https://dog.ceo/api/breeds/list';
    getBreedImagesUrl = 'https://dog.ceo/api/breed/';

    fetchingImages = false;
    timeSubject = new Subject<String>();

    counter$ = this.timeSubject.asObservable();

    constructor(private http: HttpClient) {
        this.initCounter();
    }

    initCounter() {
        let count = 0;
        setInterval(() => {
            let date = new Date();
            this.timeSubject.next(date.toLocaleString());
        }, 1000)
    }
    getListOfDogBreeds(filter) {
        return this.http.get(this.getListOfDogBreedsUrl)
            .pipe(
                map((data: any) => {
                    data = data.message;
                    return data.filter((item) => item.includes(filter));
                })
            )
    }
    getBreedImages(breed) {
        this.fetchingImages = true;
        return this.http.get(`${this.getBreedImagesUrl}${breed}/images`)
            .pipe(
                tap(() => { this.fetchingImages = false }),
                map((data: any) => data.message)
            );
    }
    getCounter() {
        return this.counter$;
    }
}
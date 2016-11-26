import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Hero } from './hero';
import { HeroSearchService } from './hero-search.service'; 

@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['hero-search.component.css'],
    providers: [ HeroSearchService ]
})

export class HeroSearchComponent implements OnInit{
    heroes: Observable<Hero[]>;
    private _searchTerms = new Subject<string>();
    constructor(private _heroSearchService: HeroSearchService, private _router: Router){}

    //Push the search term into the Observable Stream
    search(term: string): void{
        this._searchTerms.next(term);
    }

    ngOnInit(): void{
        this.heroes = this._searchTerms
                        .debounceTime(300)  //wait for 300ms pause in the events
                        .distinctUntilChanged() //ignore if the next search term is the same as the pervious one
                        .switchMap(term => term //switch to new Observable each time 
                            //return the Http search Observable 
                            ? this._heroSearchService.search(term)
                            //or an Empty Observable of heroes if no search term 
                            : Observable.of<Hero[]>([]))
                        .catch(err => {
                            console.log("Error: ", err);
                            return Observable.of<Hero[]>([]);
                        });
    }

    gotoDetail(hero: Hero): void{
        let link = ['/detail', hero.id];
        this._router.navigate(link);
    }
}
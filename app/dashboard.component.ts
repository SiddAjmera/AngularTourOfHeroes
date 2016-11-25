import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    providers: [HeroService]
})

export class DashboardComponent implements OnInit{

    heroes: Hero[];

    constructor(private _heroService: HeroService){}

    ngOnInit(): void{
        this._heroService.getHeroes().
            then(heroes => this.heroes = heroes.slice(1, 5));
    }
}
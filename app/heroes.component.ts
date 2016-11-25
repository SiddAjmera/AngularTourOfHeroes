import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    template: `
        <h2>My Heroes</h2>
        <div>
            <label for="">Hero Name</label>
            <input #heroName />
            <button (click)="add(heroName.value); heroName.value=''">Add</button>
        </div>
        <ul class="heroes">
            <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                <span class="badge">{{hero.id}}</span> {{hero.name}}
                <button class="delete" (click)="delete(hero); $event.stopPropagation();">X</button>
            </li>
        </ul>
        <div *ngIf="selectedHero">
            <h2>{{selectedHero.name |  uppercase}} is my hero!</h2>
            <button (click)="gotoDetail()">Go to Details</button>
        </div>
    `,
    styleUrls: ['heroes.component.css'],
    providers: [HeroService]   
})

export class HeroesComponent implements OnInit { 
    constructor(private _heroService: HeroService, private _router: Router){}
    title = 'Tour of Heroes';
    selectedHero: Hero;
    heroes: Hero[];

    add(hero: string): void{
        var hero = hero.trim();
        if(!hero) return;
        this._heroService.addHero(hero).then(returnedhero => {
            this.heroes.push(returnedhero);
            this.selectedHero = null;
        });
    }

    delete(hero: Hero): void{
        this._heroService.deleteHero(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(temp => temp.id !== hero.id)
                if(this.selectedHero === hero) this.selectedHero = null;
            });
    }

    gotoDetail(): void{
        this._router.navigate(['/detail', this.selectedHero.id]);
    }

    getHeroes(): void {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    ngOnInit(): void{
        this.getHeroes();
    }
}
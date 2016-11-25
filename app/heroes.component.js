"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_service_1 = require('./hero.service');
var HeroesComponent = (function () {
    function HeroesComponent(_heroService, _router) {
        this._heroService = _heroService;
        this._router = _router;
        this.title = 'Tour of Heroes';
    }
    HeroesComponent.prototype.add = function (hero) {
        var _this = this;
        var hero = hero.trim();
        if (!hero)
            return;
        this._heroService.addHero(hero).then(function (returnedhero) {
            _this.heroes.push(returnedhero);
            _this.selectedHero = null;
        });
    };
    HeroesComponent.prototype.delete = function (hero) {
        var _this = this;
        this._heroService.deleteHero(hero.id)
            .then(function () {
            _this.heroes = _this.heroes.filter(function (temp) { return temp.id !== hero.id; });
            if (_this.selectedHero === hero)
                _this.selectedHero = null;
        });
    };
    HeroesComponent.prototype.gotoDetail = function () {
        this._router.navigate(['/detail', this.selectedHero.id]);
    };
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this._heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-heroes',
            template: "\n        <h2>My Heroes</h2>\n        <div>\n            <label for=\"\">Hero Name</label>\n            <input #heroName />\n            <button (click)=\"add(heroName.value); heroName.value=''\">Add</button>\n        </div>\n        <ul class=\"heroes\">\n            <li *ngFor=\"let hero of heroes\" (click)=\"onSelect(hero)\" [class.selected]=\"hero === selectedHero\">\n                <span class=\"badge\">{{hero.id}}</span> {{hero.name}}\n                <button class=\"delete\" (click)=\"delete(hero); $event.stopPropagation();\">X</button>\n            </li>\n        </ul>\n        <div *ngIf=\"selectedHero\">\n            <h2>{{selectedHero.name |  uppercase}} is my hero!</h2>\n            <button (click)=\"gotoDetail()\">Go to Details</button>\n        </div>\n    ",
            styleUrls: ['heroes.component.css'],
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.Router])
    ], HeroesComponent);
    return HeroesComponent;
}());
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map
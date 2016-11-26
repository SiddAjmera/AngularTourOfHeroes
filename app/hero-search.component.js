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
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var hero_search_service_1 = require('./hero-search.service');
var HeroSearchComponent = (function () {
    function HeroSearchComponent(_heroSearchService, _router) {
        this._heroSearchService = _heroSearchService;
        this._router = _router;
        this._searchTerms = new Subject_1.Subject();
    }
    //Push the search term into the Observable Stream
    HeroSearchComponent.prototype.search = function (term) {
        this._searchTerms.next(term);
    };
    HeroSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroes = this._searchTerms
            .debounceTime(300) //wait for 300ms pause in the events
            .distinctUntilChanged() //ignore if the next search term is the same as the pervious one
            .switchMap(function (term) { return term //switch to new Observable each time 
            ? _this._heroSearchService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (err) {
            console.log("Error: ", err);
            return Observable_1.Observable.of([]);
        });
    };
    HeroSearchComponent.prototype.gotoDetail = function (hero) {
        var link = ['/detail', hero.id];
        this._router.navigate(link);
    };
    HeroSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hero-search',
            templateUrl: './hero-search.component.html',
            styleUrls: ['hero-search.component.css'],
            providers: [hero_search_service_1.HeroSearchService]
        }), 
        __metadata('design:paramtypes', [hero_search_service_1.HeroSearchService, router_1.Router])
    ], HeroSearchComponent);
    return HeroSearchComponent;
}());
exports.HeroSearchComponent = HeroSearchComponent;
//# sourceMappingURL=hero-search.component.js.map
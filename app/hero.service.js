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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var HeroService = (function () {
    function HeroService(_http) {
        this._http = _http;
        this._url = "app/heroes";
        this._headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    HeroService.prototype.getHeroes = function () {
        return this._http.get(this._url)
            .toPromise()
            .then(function (heroes) { return heroes.json().data; })
            .catch(function (err) { return Promise.reject(err); });
    };
    HeroService.prototype.getHero = function (id) {
        return this.getHeroes().then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
    };
    HeroService.prototype.update = function (hero) {
        var url = this._url + "/" + hero.id;
        return this._http.put(url, JSON.stringify(hero), this._headers)
            .toPromise()
            .then(function () { return hero; })
            .catch(function (err) { return Promise.reject(err); });
    };
    HeroService.prototype.addHero = function (hero) {
        return this._http.post(this._url, JSON.stringify({ name: hero }), this._headers)
            .toPromise()
            .then(function (hero) { return hero.json().data; })
            .catch(function (err) { return Promise.reject(err); });
    };
    HeroService.prototype.deleteHero = function (heroId) {
        var url = this._url + "/" + heroId;
        return this._http.delete(url, { headers: this._headers })
            .toPromise()
            .then(function () { return null; })
            .catch(function (err) { return Promise.reject(err); });
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map
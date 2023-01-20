import { Component } from '@angular/core';
import { apikey } from 'src/api-key';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-cats',
  templateUrl: './fetch-cats.component.html',
  styleUrls: ['./fetch-cats.component.css']
})

export class FetchCatsComponent {
  //  Dependency Injection
  //  Instead of the component class itself instantiating the HttpClient class, we ask the framework to inject an instance (or a copy) of HttpClient
  //  It's a design pattern for loose coupling
  //  By setting httpClient private, we only allow this class to have access to it. If I were to set it to public, the html page will also have access to that
  constructor (private http: HttpClient) {}

  numCats: number = 0;
  catPics :  any [] = [];
  now: number | Date = Date.now ();

  getCats () : void
  {
    //  Send an http call to get cats
    const url = `https://api.thecatapi.com/v1/images/search?limit=${this.numCats}`;
    this.http.get (url,
      {
        headers: {
          'x-api-key' : apikey
        }
      }).subscribe ((data: any) => 
      {
        this.catPics = data;
      });
  }
}

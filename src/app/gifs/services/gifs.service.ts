import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey : string = 'https://localhost:7001/api/products/'
  private _historial: string[] = []

  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
    }
    
    this.http.get('https://localhost:7001/api/products/productPage/ella')
      .subscribe( (resp: any) => {
        console.log(resp)
      })
  }
}

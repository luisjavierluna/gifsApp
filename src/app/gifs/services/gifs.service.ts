import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse } from '../Interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'https://localhost:7001/api/products/'
    // private apiKey : string = 'https://sp-api20230124162228.azurewebsites.net/api/products/'
  private _historial: string[] = []

  public resultados: SearchGifsResponse[] = []

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
    
    this.http.get<SearchGifsResponse>(`https://localhost:7001/api/products/productPage/${query}`)
      .subscribe( (resp ) => {
        console.log(resp)
        this.resultados = [];
        this.resultados.push(resp)
      })
  }
}

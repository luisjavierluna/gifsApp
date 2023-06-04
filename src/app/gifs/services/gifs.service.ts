import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse } from '../Interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl : string = 'https://localhost:7001/api/products/productPage'
    // private apiKey : string = 'https://sp-api20230124162228.azurewebsites.net/api/products/'
  private _historial  : string[] = []

  public resultados: SearchGifsResponse[] = []

  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)

      localStorage.setItem('historial', JSON.stringify( this._historial ))

    }

    // const params = new HttpParams()
    //   .set('q', query)
    //   .set('api_key', this.apiKey)
    //   .set('limit', '10')
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/${query}`)
      .subscribe( (resp ) => {
        this.resultados = [];
        this.resultados.push(resp)
        localStorage.setItem('resultados', JSON.stringify( this.resultados )  )
      })
  }
}

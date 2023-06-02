import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey : string = "https://sp-api20230124162228.azurewebsites.net/api/products/" // En la clase utiliza una api de este sitiohttps://developers.giphy.com/ , pero se tiene que crear cuenta
  private _historial: string[] = []

  get historial() {
    
    return [...this._historial]
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
    }
    

    console.log(this._historial)
  }
}

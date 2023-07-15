import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Genero } from '../models/genero.model';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(private http:HttpClient) { }

  endPoint: string = environment.baseUrl+"/genero";
  formData:Genero = new Genero();
  //listaGeneros: Genero[];

  postGenero(payload: Genero) {
   
    
    return this.http.post<Genero>(this.endPoint, payload)
  }

  putGenero(genero: Genero) { 
    console.log('llega al servicio'); 
    return this.http.put<Genero>(this.endPoint, Genero)
  }

  getGeneros(){
    return this.http.get<Genero[]>(this.endPoint);
            
  }

  getGenero(id: number):Observable<Genero>{
    /*return this.http.get(`${this.baseUrl}/${id}`)
            .toPromise()
            .then(res => this.formData = res as Genero);*/
    return this.http.get<Genero>(`${this.endPoint}/${id}`)              
            //.map((response: Response) => response.json())
            //.toPromise()
            //.then(res => this.formData = res as Genero)
            //.catch(this.errorHandler);
  }

  deleteGenero(id: number){
    console.log(this.endPoint+'/'+id);
    return this.http.delete(`${this.endPoint}/${id}`);
  }

  /*
  getGeneros() : Observable<Genero[]>{
    return this.http.get<Genero[]>(`http://localhost:1713/api/Genero/GetGeneros`);*/
  

  errorHandler(error: Response) {  
    console.log(error);  
    return Observable.throw(error);  
  }  
}


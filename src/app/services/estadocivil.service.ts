import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { EstadoCivil } from '../models/EstadoCivil.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  constructor(private http:HttpClient) { }

  endPoint: string = environment.baseUrl+"/EstadoCivil";
  formData:EstadoCivil = new EstadoCivil();
  //listaEstadoCivils: EstadoCivil[];

  postEstadoCivil(payload: EstadoCivil) {
    console.log('llega al servicio');
    
    return this.http.post<EstadoCivil>(this.endPoint, payload)
  }

  putEstadoCivil(EstadoCivil: EstadoCivil) {  
    return this.http.put<EstadoCivil>(this.endPoint, EstadoCivil)
  }

  getEstadoCivils(){
    return this.http.get<EstadoCivil[]>(this.endPoint);
            
  }

  getEstadoCivil(id: number):Observable<EstadoCivil>{
    /*return this.http.get(`${this.baseUrl}/${id}`)
            .toPromise()
            .then(res => this.formData = res as EstadoCivil);*/
    return this.http.get<EstadoCivil>(`${this.endPoint}/${id}`)              
            //.map((response: Response) => response.json())
            //.toPromise()
            //.then(res => this.formData = res as EstadoCivil)
            //.catch(this.errorHandler);
  }

  deleteEstadoCivil(id: number){
    console.log(this.endPoint+'/'+id);
    return this.http.delete(`${this.endPoint}/${id}`);
  }

  /*
  getEstadoCivils() : Observable<EstadoCivil[]>{
    return this.http.get<EstadoCivil[]>(`http://localhost:1713/api/EstadoCivil/GetEstadoCivils`);*/
  

  errorHandler(error: Response) {  
    console.log(error);  
    return Observable.throw(error);  
  }  
}

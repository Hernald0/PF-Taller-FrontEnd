import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Servicio } from '../models/servicio.model';
import { ItemDto } from '../models/ItemDto.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http:HttpClient) { }

  endPoint: string = environment.baseUrl+"/ServiciosRepuestos/";
  formData:Servicio = new Servicio();
  //listaServicios: Servicio[];

  postServicio(payload: Servicio) { 
    return this.http.post<Servicio>(this.endPoint+'insServicio', payload)
  }

  putServicio(servicio: Servicio) { 
    console.log('llega al servicio'); 
    return this.http.put<Servicio>(this.endPoint+'updServicio', servicio)
  }

  getServicios(){
    return this.http.get<Servicio[]>(this.endPoint+'findAllServicio');
            
  }

  getServicio(id: number):Observable<Servicio>{
    /*return this.http.get(`${this.baseUrl}/${id}`)
            .toPromise()
            .then(res => this.formData = res as Servicio);*/
    return this.http.get<Servicio>(`${this.endPoint+'findServicio'}/${id}`)              
            //.map((response: Response) => response.json())
            //.toPromise()
            //.then(res => this.formData = res as Servicio)
            //.catch(this.errorHandler);
  }

  deleteServicio(id: number){
    console.log(this.endPoint+'delServicio'+'/'+id);
    return this.http.delete(`${this.endPoint+'delServicio'}/${id}`);
  }

  searchFilterRepServ(filterString: string){
    console.log('filterString', filterString);
    
    const params = new HttpParams().set('pBusqueda', filterString);
    return this.http.get<ItemDto[]>(this.endPoint+'findFilterServReps', { params }) 

  }

  /*
  getServicios() : Observable<Servicio[]>{
    return this.http.get<Servicio[]>(`http://localhost:1713/api/Servicio/GetServicios`);*/
  

  errorHandler(error: Response) {  
    console.log(error);  
    return Observable.throw(error);  
  }  
}


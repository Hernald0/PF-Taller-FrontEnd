import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {

  listaPersonas: Persona[];

  constructor(public service:PersonasService) { }

  ngOnInit() :void {
    this.service.getPersonas().subscribe(res => {
                                                 this.listaPersonas = res as Persona[]
                                                 console.log(res);
                                                });          
    
  }

}

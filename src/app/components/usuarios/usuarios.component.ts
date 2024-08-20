import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarioForm: FormGroup;

  modulos: string[] = [
    'Caja', 'Tienda', 'Taller', 'Inventario', 'Configuración', 'Informes', 'Gráficas',
    'Contacto', 'Trabajadores', 'Herramientas', 'Usuarios', 'Mi cuenta'
  ];

  constructor(private fb: FormBuilder) {
    // Aquí estamos creando la instancia del FormGroup
    this.usuarioForm = this.fb.group({
      nombre: [''],
      usuario: [''],
      clave: [''],
      tipo: [''],
      puedeCrear: [false],
      puedeEditar: [false],
      puedeEliminar: [false],
      puedeVerPrecios: [false],
      accesos: this.fb.array(this.modulos.map(modulo => this.fb.control(false)))
    });
  }

  get accesos() {
    return this.usuarioForm.get('accesos') as FormArray;
  }

  ngOnInit(): void {}

  guardarUsuario() {
    console.log(this.usuarioForm.value);
    // Lógica para guardar los datos del usuario
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

   usuario: Usuario = {
    usuarioId: 0,
    username: '',
    password: '',
    email: '',
    nombreCompleto: '',
    activo: true,
    roles: []
  };

  rolesDisponibles: Rol[] = [
    { rolId: 1, nombre: 'Admin', descripcion: 'Administrador', activo: true },
    { rolId: 2, nombre: 'Usuario', descripcion: 'Usuario básico', activo: true }
  ]; // luego se carga desde backend

  constructor(
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.usuariosService.getUsuario(id).subscribe(data => this.usuario = data);
    }
  }

  tieneRol(rol: any): boolean {
  return this.usuario.roles.some((r: any) => r.rolId === rol.rolId);
  }

  toggleRol(rol: any, event: any): void {
    const checked = event.target.checked;

    if (checked) {
      // Agregar el rol si no existe
      if (!this.tieneRol(rol)) {
        this.usuario.roles.push(rol);
      }
    } else {
      // Quitar el rol
      this.usuario.roles = this.usuario.roles.filter((r: any) => r.rolId !== rol.rolId);
    }
  }

  saveUsuario() {
    if (this.usuario.usuarioId === 0) {
      this.usuariosService.createUsuario(this.usuario).subscribe(() => this.router.navigate(['/usuarios']));
    } else {
      this.usuariosService.updateUsuario(this.usuario).subscribe(() => this.router.navigate(['/usuarios']));
    }
  }

}

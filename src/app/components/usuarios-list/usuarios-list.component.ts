import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';


@Component({
  selector: 'usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService, private router: Router) {}

   ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  getNombresRoles(usuario: any): string {
  if (!usuario.roles || usuario.roles.length === 0) return '-';
  return usuario.roles.map(r => r.nombre).join(', ');
}

  editUsuario(usuario: Usuario) {
    this.router.navigate(['/usuarios/edit', usuario.usuarioId]);
  }

  deleteUsuario(usuario: Usuario) {
    if (confirm(`¿Eliminar usuario ${usuario.username}?`)) {
      this.usuariosService.deleteUsuario(usuario.usuarioId).subscribe(() => {
        this.loadUsuarios();
      });
    }
  }

  addUsuario() {
    this.router.navigate(['/usuarios/new']);
  }

}

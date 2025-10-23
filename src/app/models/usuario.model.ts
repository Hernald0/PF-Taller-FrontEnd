import { Rol } from "./rol.model";

export interface Usuario {
  usuarioId: number;
  username: string;
  email: string;
  nombreCompleto: string;
  password: string;
  activo: boolean;
  roles: Rol[];
}
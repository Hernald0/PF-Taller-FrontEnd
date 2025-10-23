import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: Usuario) {
    if (user.username !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      
      console.log('valida login auth2' + this.loggedIn.getValue());

      this.router.navigate(['/events']);
    }
  }
  

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
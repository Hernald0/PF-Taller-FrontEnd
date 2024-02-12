import { Injectable } from '@angular/core';
import { AuthService } from './auth2.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
/*
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{


  constructor(
    private authService: AuthService,
    private route: Router
  ) { }*/
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      
      return this.authService.isLoggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
              
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
    }
  }

  /*
  canActivate() {
    console.log("No estas logueado - login-guard");
    console.log(this.authService.isLoggedIn);
    // Sino estoy logueado, vuelvo al login
    if (!this.authService.isLoggedIn) {
      console.log("No estas logueado");
      this.route.navigate(['login'])
      return false;
    }

    return true;
  }
  
//}*/

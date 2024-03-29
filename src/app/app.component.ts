import { Component, OnInit } from '@angular/core';
 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  
  title = 'pf-taller-frontend';
  
  isLoggedIn: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService) {}
  
  ngOnInit(): void {
   /*  this.authService.isLoggedIn.subscribe((loggedIn) => {
      console.log('valor loggedIn '+ loggedIn);
      this.isLoggedIn = loggedIn;
    }); */
  }
}

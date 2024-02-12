import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth2.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'ddr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public showLoginError: boolean;

  constructor(
    private formBuiler: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {
  
  }

  ngOnInit() {
      // Creo el formgroup
      this.formLogin = this.formBuiler.group({
        email: new FormControl('hernaldo@hotmail.com', [Validators.required, Validators.email]),
        password: new FormControl('asdas', Validators.required)
      })
      this.showLoginError = false;
  }

  /**
   * Compruebo si el login es correcto
   */
  checkLogin() {
    
    // Cojo el email y el pass
    //let usuario : Usuario;
    let usuario: Usuario = {
      ...this.formLogin.value
    };
      console.log(this.formLogin.get('email').value);
      console.log(this.formLogin.get('password').value);
      usuario.usuarioNombre = this.formLogin.get('email').value ;
      //usuario.password = this.formLogin.get('pass').valueOf;
    //logueado = true;
    //this.route.navigate(['/events'])

    // Nos logueamos 
    this.authService.login(usuario);
      /*.then(state => {

       console.log(state);
       this.route.navigate(['/add-event'])
      //this.route.navigate(['/dashboard'])

     }, error => {
      console.error(error);
      this.showLoginError = true;
    })*/

  }

}
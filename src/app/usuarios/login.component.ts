import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'

})
export class LoginComponent implements OnInit {

  titulo: string = 'Inicio de Sesión!';
  usuario: Usuario;

  constructor( private authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()){
      swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado`, 'info'); 
      this.router.navigate(['/productos']);
    }
  }

  login(): void{ 
    console.log(this.usuario);
    if(this.usuario.username === null || this.usuario.password === null){
      swal.fire('Error login', 'Username o password vacías!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      const usuario = this.authService.usuario;
      this.router.navigate(['/productos']);
      swal.fire('Login', `Hola ${usuario.username}, has inciado sesión`, 'success');   
    },err =>{
      if(err.status == 400){
        swal.fire('Error login', '¡Usuario o contraseña incorrecta!', 'error');
      }
    }
    );
  }
}

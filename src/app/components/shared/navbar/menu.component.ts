import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../../../usuarios/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent  {

  constructor(public authService : AuthService , private router: Router ) { }

  logout():void{
    this.authService.logout();
    swal.fire('Logout', `Hola ${this.authService.usuario.username}, has cerrado sesión`);
    this.router.navigate(['/login']);
  }

}

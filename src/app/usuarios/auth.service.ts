import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }


  public get usuario(): Usuario{
    if(this.usuario != null){
      return this._usuario;
    } else if(this.usuario == null && sessionStorage.getItem('usuario')!= null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if(this.token != null){
      return this._token;
    } else if(this.token == null && sessionStorage.getItem('token')!= null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any>{

    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp'+ ':'+ '12345');

    const httpHeaders = new  HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                          Authorization: 'Basic ' + credenciales});

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }


  guardarUsuario(accessToken: string):void{

    const payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accesToken: string):void{
    this._token = accesToken;
    sessionStorage.setItem('token', accesToken);
  }

  obtenerDatosToken(accessToken: string): any{
    if(accessToken != null){
      return  JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }

}

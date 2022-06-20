import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
//import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private store: Store<AppState>
    /* private usuarioService: UsuarioService */
  ) { }

  ngOnInit(): void {

    this.store.select('usuarios').subscribe(({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      console.log(error);
      //verify if error is {}
      this.error = error?.message;
    })

    this.store.dispatch(cargarUsuarios())


    /*  this.usuarioService.getUsers().subscribe((data) => {
       this.usuarios = data;
       console.log(data);
     }); */
  }

}

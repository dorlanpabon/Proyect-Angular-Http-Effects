import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const cargarUsuario = createAction('[Usuarios] cargarUsuario'
    , props<{ id: string }>());
export const cargarUsuarioSuccess = createAction('[Usuarios] cargarUsuarioSuccess',
    props<{ usuario: Usuario }>());
export const cargarUsuarioError = createAction('[Usuarios] cargarUsuarioSuccess',
    props<{ payload: any }>());
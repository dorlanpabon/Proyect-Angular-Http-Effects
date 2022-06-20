import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from '../actions';

export interface UsuariosState {
    users: Usuario[],
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuariosinitialState: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
}

const _usuariosReducer = createReducer(usuariosinitialState,
    on(cargarUsuarios, state => ({ ...state, loading: true })),
    on(cargarUsuariosSuccess, (state, { usuarios }) => ({ ...state, users: usuarios, loaded: true, loading: false, error: null })),
    on(cargarUsuariosError, (state, { payload }) => ({
        ...state, loaded: false, loading: false, error: {
            name: payload?.name,
            message: payload?.message,
            url: payload?.url
        }
    }))
);

export function usuariosReducer(state: UsuariosState = usuariosinitialState, action: Action) {
    return _usuariosReducer(state, action);
}
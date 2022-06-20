import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';

export interface UsuarioState {
    id: string | null,
    user: Usuario | null,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuarioinitialState: UsuarioState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
}

const _usuarioReducer = createReducer(usuarioinitialState,
    on(cargarUsuario, (state, { id }) => ({
        ...state, loading: true,
        id: id
    })),

    on(cargarUsuarioSuccess, (state, { usuario }) => ({ ...state, user: { ...usuario }, loaded: true, loading: false })),

    on(cargarUsuarioError, (state, { payload }) => ({
        ...state, loaded: false, loading: false, error: {
            name: payload?.name,
            message: payload?.message,
            url: payload?.url
        }
    }))
);

export function usuarioReducer(state: UsuarioState = usuarioinitialState, action: Action) {
    return _usuarioReducer(state, action);
}
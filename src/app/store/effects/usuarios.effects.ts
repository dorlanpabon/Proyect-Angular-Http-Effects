import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsuarioService } from "src/app/services/usuario.service";
import { AppState } from "../app.reducers";
import { of, tap } from "rxjs";
import { map, switchMap, catchError } from 'rxjs/operators';
import * as usuariosActions from "../actions/usuarios.actions";

@Injectable()
export class UsuariosEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService,
        private store: Store<AppState>
    ) { }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),//especificar cual es el action que quiero que se ejecute
            //tap((data) => console.log('effect tap', data)),
            switchMap(() => (
                this.usuarioService.getUsers()
                    .pipe(
                        map(users => {
                            return usuariosActions.cargarUsuariosSuccess({ usuarios: users })
                        }),
                        catchError(error => {
                            console.log('error', error);
                            return of(usuariosActions.cargarUsuariosError({ payload: error })

                            )
                        })
                    )
            ))
        )
    );
}
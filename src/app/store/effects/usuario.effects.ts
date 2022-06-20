import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsuarioService } from "src/app/services/usuario.service";
import { AppState } from "../app.reducers";
import { of, tap } from "rxjs";
import { map, switchMap, catchError } from 'rxjs/operators';
import * as usuarioActions from "../actions/usuario.actions";

@Injectable()
export class UsuarioEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService,
        private store: Store<AppState>
    ) { }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuarioActions.cargarUsuario),//especificar cual es el action que quiero que se ejecute
            //tap((data) => console.log('effect tap', data)),
            switchMap((action) => (
                this.usuarioService.getUserById(action.id)
                    .pipe(
                        map(users => {
                            return usuarioActions.cargarUsuarioSuccess({ usuario: users })
                        }),
                        catchError(error => {
                            console.log('error', error);
                            return of(usuarioActions.cargarUsuarioError({ payload: error })

                            )
                        })
                    )
            ))
        )
    );
}
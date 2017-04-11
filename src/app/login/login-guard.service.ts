import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {LoginService} from './login.service';

@Injectable()
export class LoginGuardService implements CanActivate {

    constructor(private _loginService: LoginService) {
    }

    canActivate(
        // nextRoute: ActivatedRouteSnapshot,
        // state: RouterStateSnapshot
    ): Promise<boolean> /* | Observalbe<boolean> | boolean */ {

        return this._loginService.getUser()
        .then((firebaseUser) => {
            const canActivate: boolean = Boolean(firebaseUser);
            if (canActivate) {
                console.log('Allowing route activation.');
            } else {
                console.log('Prohibiting route activation.');
            }
            return canActivate;
        });
    }

}

import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {LoginService} from './login.service';

@Injectable()
export class LoginGuardService implements CanActivate {

    private _loginService: LoginService;

    constructor(loginService: LoginService) {
        this._loginService = loginService;
    }

    canActivate(/*route: ActivatedRouteSnapshot*/): Promise<boolean> {

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

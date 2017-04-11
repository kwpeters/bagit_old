import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginGuardService} from './login/login-guard.service';
import {LoginService} from './login/login.service';
import { MainComponent } from './main/main.component';


const routes: Routes = [
    {path: '',        redirectTo: 'welcome', pathMatch: 'full'},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'main',    component: MainComponent, canActivate: [LoginGuardService]},
    {path: '**',      component: NotFoundComponent}, // 404 component
];


@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        NotFoundComponent,
        MainComponent
    ],
    imports:      [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    providers:    [
        LoginGuardService,
        LoginService
    ],
    bootstrap:    [AppComponent]
})
export class AppModule {
}

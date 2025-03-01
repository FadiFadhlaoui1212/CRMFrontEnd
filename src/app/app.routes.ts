import { Routes } from "@angular/router";

import { RegistrationComponent } from "./components/registration/registration.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ActivityFormComponent } from "./components/activity-form/activity-form.component";


export const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'app', component: AppComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'home', component: HomeComponent},
    {path: 'activity-form', component: ActivityFormComponent}
    
]
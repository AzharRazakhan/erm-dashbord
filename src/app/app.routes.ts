import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashbord } from './features/dashbord/dashbord/dashbord';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
    {
        path: 'login', component: Login,
    },
    {
        path: '', redirectTo:'login',pathMatch:'full',
    },
    {
        path: 'dashbord',
        component: Dashbord,
        canActivate:[authGuard]
    }
];

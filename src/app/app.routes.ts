import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashbord } from './features/dashbord/dashbord/dashbord';
import { authGuard } from './core/auth-guard';
import { EmployeeComponent } from './features/employees/employee/employee';
import { Signup } from './auth/signup/signup';
import { AddEditEmployee } from './features/employees/add-edit-employee/add-edit-employee';

export const routes: Routes = [
    {
        path: 'login', component: Login,
    },
    {
        path: 'signup', component: Signup,
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full',
    },
    {
        path: 'dashbord',
        component: Dashbord,
        canActivate: [authGuard]
    },
    {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [authGuard],
    },
    {
        path: 'employees/add',
        component: AddEditEmployee,
        canActivate: [authGuard],
    },

    { path: 'employees', component: EmployeeComponent },
    { path: 'employees/add', component: AddEditEmployee },
    { path: 'employees/edit/:id', component: AddEditEmployee },
];

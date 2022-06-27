import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPeopleComponent } from './people/lista-people.component';
import { DetallePeopleComponent } from './people/detalle-people.component';
import { NuevoPeopleComponent } from './people/nuevo-people.component';
import { EditarPeopleComponent } from './people/editar-people.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationGuard} from './services/authentication.guard';

const routes: Routes = [
  {path: '', component: ListaPeopleComponent, canActivate: [AuthenticationGuard]},
  {path: 'detalle/:id', component: DetallePeopleComponent, canActivate: [AuthenticationGuard]},
  {path: 'nuevo', component: NuevoPeopleComponent, canActivate: [AuthenticationGuard]},
  {path: 'editar/:id', component: EditarPeopleComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
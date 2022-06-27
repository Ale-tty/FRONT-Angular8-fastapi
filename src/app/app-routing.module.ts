import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { ListaPeopleComponent } from './people/lista-people.component';
import { DetallePeopleComponent } from './people/detalle-people.component';
import { NuevoPeopleComponent } from './people/nuevo-people.component';
import { EditarPeopleComponent } from './people/editar-people.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './services/guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: ListaPeopleComponent, canActivate: [AuthGuard] },
  { path: 'detalle/:id', component: DetallePeopleComponent, canActivate: [AuthGuard] },
  { path: 'nuevo', component: NuevoPeopleComponent, canActivate: [AuthGuard] },
  { path: 'editar/:id', component: EditarPeopleComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
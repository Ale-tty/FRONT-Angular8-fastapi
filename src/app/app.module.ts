import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPeopleComponent } from './people/lista-people.component';
import { DetallePeopleComponent } from './people/detalle-people.component';
import { NuevoPeopleComponent } from './people/nuevo-people.component';
import { EditarPeopleComponent } from './people/editar-people.component';
import { HttpClientModule } from '@angular/common/http';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth.module';
import { PlaceholderDirective } from './shared/Placeholder.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ListaPeopleComponent,
    DetallePeopleComponent,
    NuevoPeopleComponent,
    EditarPeopleComponent,
    PageNotFoundComponent,
    // LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPeopleComponent } from './people/lista-people.component';
import { DetallePeopleComponent } from './people/detalle-people.component';
import { NuevoPeopleComponent } from './people/nuevo-people.component';
import { EditarPeopleComponent } from './people/editar-people.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// import { routing } from "./app.routing";
// import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    ListaPeopleComponent,
    DetallePeopleComponent,
    NuevoPeopleComponent,
    EditarPeopleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

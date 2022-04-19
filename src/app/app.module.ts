import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//este modelo Http me va a permitir manejar las llamadas http en los srvicios

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/nav/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav/nav-bar/nav-bar.component';
import { HomeComponent } from './components/app/home/home.component';
import { ClientesComponent } from './components/app/clientes/clientes.component';
import { ReservasComponent } from './components/app/reservas/reservas.component';
import { DevolucionesComponent } from './components/app/devoluciones/devoluciones.component';
import { AhorroProgramadoComponent } from './components/app/ahorro-programado/ahorro-programado.component';
import { ToursComponent } from './components/app/tours/tours.component';
import { CajaMenorComponent } from './components/app/caja-menor/caja-menor.component';
import { CajaMayorComponent } from './components/app/caja-mayor/caja-mayor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { MensajeConfirmacionComponent } from './components/app/mensaje-confirmacion/mensaje-confirmacion.component';
import { AddEditClienteComponent } from './components/app/clientes/add-edit-cliente/add-edit-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AddEditReservaComponent } from './components/app/reservas/add-edit-reserva/add-edit-reserva.component';
import { AddEditTourComponent } from './components/app/tours/add-edit-tour/add-edit-tour.component';
import { AddEditDevolucionComponent } from './components/app/devoluciones/add-edit-devolucion/add-edit-devolucion.component';
import { AddEditAhorroComponent } from './components/app/ahorro-programado/add-edit-ahorro/add-edit-ahorro.component';
import { CuentasComponent } from './components/app/cuentas/cuentas.component';
import { AddEditCuentaComponent } from './components/app/cuentas/add-edit-cuenta/add-edit-cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavBarComponent,
    HomeComponent,
    ClientesComponent,
    ReservasComponent,
    DevolucionesComponent,
    AhorroProgramadoComponent,
    ToursComponent,
    CajaMenorComponent,
    CajaMayorComponent,
    MensajeConfirmacionComponent,
    AddEditClienteComponent,
    AddEditReservaComponent,
    AddEditTourComponent,
    AddEditDevolucionComponent,
    AddEditAhorroComponent,
    CuentasComponent,
    AddEditCuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

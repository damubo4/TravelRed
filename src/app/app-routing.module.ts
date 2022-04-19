import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditClienteComponent } from './components/app/clientes/add-edit-cliente/add-edit-cliente.component';
import { AhorroProgramadoComponent } from './components/app/ahorro-programado/ahorro-programado.component';
import { CajaMayorComponent } from './components/app/caja-mayor/caja-mayor.component';
import { CajaMenorComponent } from './components/app/caja-menor/caja-menor.component';
import { ClientesComponent } from './components/app/clientes/clientes.component';
import { DevolucionesComponent } from './components/app/devoluciones/devoluciones.component';
import { HomeComponent } from './components/app/home/home.component';
import { ReservasComponent } from './components/app/reservas/reservas.component';
import { ToursComponent } from './components/app/tours/tours.component';
import { AddEditReservaComponent } from './components/app/reservas/add-edit-reserva/add-edit-reserva.component';
import { AddEditTourComponent } from './components/app/tours/add-edit-tour/add-edit-tour.component';
import { AddEditDevolucionComponent } from './components/app/devoluciones/add-edit-devolucion/add-edit-devolucion.component';
import { AddEditAhorroComponent } from './components/app/ahorro-programado/add-edit-ahorro/add-edit-ahorro.component';
import { CuentasComponent } from './components/app/cuentas/cuentas.component';
import { AddEditCuentaComponent } from './components/app/cuentas/add-edit-cuenta/add-edit-cuenta.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  // CLIENTES
  { path: 'clientes', component: ClientesComponent},
  { path: 'clientes/addCliente', component: AddEditClienteComponent},
  { path: 'clientes/editCliente/:id', component: AddEditClienteComponent},
  // RESERVAS
  { path: 'reservas', component: ReservasComponent},
  { path: 'reservas/addReserva', component: AddEditReservaComponent},
  { path: 'reservas/editReserva/:id', component: AddEditReservaComponent},
  // DEVOLUCIONES
  { path: 'devoluciones', component: DevolucionesComponent},
  { path: 'devoluciones/addDevolucion', component: AddEditDevolucionComponent},
  { path: 'devoluciones/editDevolucion/:id', component: AddEditDevolucionComponent},
  // AHORRO PROGRAMADO
  { path: 'ahorros', component: AhorroProgramadoComponent},
  { path: 'ahorros/addAhorro', component: AddEditAhorroComponent},
  { path: 'ahorros/editAhorro/:id', component: AddEditAhorroComponent},
  // TOURS
  { path: 'tours', component: ToursComponent},
  { path: 'tours/addTour', component: AddEditTourComponent},
  { path: 'tours/editTour/:id', component: AddEditTourComponent},
  // CUENTAS
  { path: 'cuentas', component: CuentasComponent},
  { path: 'cuentas/addCuenta', component: AddEditCuentaComponent},
  { path: 'cuentas/editCuenta/:id', component: AddEditCuentaComponent},
  // CAJA MENOR
  { path: 'caja-menor', component: CajaMenorComponent},
  // CAJA MAYOR
  { path: 'caja-mayor', component: CajaMayorComponent},
  { path: '**', component: HomeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

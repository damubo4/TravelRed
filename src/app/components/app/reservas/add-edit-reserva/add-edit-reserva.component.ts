import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { ToursService } from 'src/app/services/tours/tours.service';


@Component({
  selector: 'app-add-edit-reserva',
  templateUrl: './add-edit-reserva.component.html',
  styleUrls: ['./add-edit-reserva.component.css']
})
export class AddEditReservaComponent implements OnInit {

  myForm: FormGroup
  idReserva: any;
  accion = 'Agregar';
  stateFormVar = false;
  buttonState = true;

  nombreCliente: string = null;
  cedulaCliente: number = null;
  idCliente : number = null;

  nombreTour: string = null;
  fechaTour: Date = null;
  idTour : number = null;

  cuentas = [];


  constructor(private fb: FormBuilder,
              private _clienteService: ClientesService,
              private _toursService: ToursService,
              private _reservasService: ReservasService,
              private _cuentasService: CuentasService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {

    this.myForm = this.fb.group({
      id_gr: [''],
      rep_gr: [''],
      obs_gr: [''],
      sup_acom: [''],
      sup_extra: [''],
      fecha_abono1: [''],
      fecha_abono2: [''],
      fecha_abono3: [''],
      valor_abono1: [''],
      valor_abono2: [''],
      valor_abono3: [''],
      lugar_abono1: [''],
      lugar_abono2: [''],
      lugar_abono3: [''],
      obs: ['']
    });

    this.idReserva = this.aRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
    if (this.idReserva !== undefined) {
      this.accion = 'Editar';
      this.buttonState = false;
      this.stateFormVar = true;
      this.editarReserva();
    }

    this._cuentasService.getCuentas().subscribe(datos => {
      this.cuentas = datos;
      console.log(this.cuentas)
    });

     this.myForm.get('rep_gr').valueChanges.subscribe(data => {
      // console.log(valorPais);
      if(data === true){
        this.myForm.get('id_gr').disable();
      }
      else if (data === false) {
        this.myForm.get('id_gr').enable();
      }
    });
  }

  agregarReserva() {

    const RESERVA = {
      id:  this.myForm.get('id_gr').value,
      rep_gr: this.myForm.get('rep_gr').value,
      grp_id: this.myForm.get('id_gr').value,
      obs_gr: this.myForm.get('obs_gr').value,
      res_acom: this.myForm.get('sup_acom').value,
      res_extra: this.myForm.get('sup_extra').value,
      res_fecha1: this.myForm.get('fecha_abono1').value,
      res_fecha2: this.myForm.get('fecha_abono2').value,
      res_fecha3: this.myForm.get('fecha_abono3').value,
      res_abono1: this.myForm.get('valor_abono1').value,
      res_abono2: this.myForm.get('valor_abono2').value,
      res_abono3: this.myForm.get('valor_abono3').value,
      res_lugar1: this.myForm.get('lugar_abono1').value,
      res_lugar2: this.myForm.get('lugar_abono2').value,
      res_lugar3: this.myForm.get('lugar_abono3').value,
      obs: this.myForm.get('obs').value
    }

    if (this.idReserva !== undefined){

      this._reservasService.editReserva(this.idReserva, RESERVA).subscribe(datos =>{
        this.snackBar.open('La reserva ha sido editada con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/reservas'])
      }), error => {
        this.myForm.reset();
      }

    } else {

      this._reservasService.addReserva(RESERVA).subscribe(datos => {
        this.snackBar.open('La reserva fue registrada con éxito','', {
          duration: 3000
          });
        this.route.navigate(['/reservas'])
      }), error => {
        this.myForm.reset();
      }
    }
  }

  editarReserva() {
    this._reservasService.getReserva(this.idReserva).subscribe(datos => {
      console.log(datos);
      this.nombreCliente = 'datos.nombreCliente';
      this.cedulaCliente = 13134;
      this.idCliente = 123;
      this.nombreTour = 'datos.nombreCliente';
      this.fechaTour = datos.res_fecha1;
      this.idTour = 1343;
      this.myForm.patchValue({
        id_gr: datos.grp_id,
        rep_gr: datos.rep_gr,
        obs_gr: datos.obs_gr,
        sup_acom: datos.res_acom,
        sup_extra: datos.res_extra,
        fecha_abono1: datos.res_fecha1,
        fecha_abono2: datos.res_fecha2,
        fecha_abono3: datos.res_fecha3,
        valor_abono1: datos.res_abono1,
        valor_abono2: datos.res_abono2,
        valor_abono3: datos.res_abono3,
        lugar_abono1: datos.res_lugar1,
        lugar_abono2: datos.res_lugar2,
        lugar_abono3: datos.res_lugar3,
        obs: datos.obs
      })
    });
  }

  stateForm(){
    this.stateFormVar = !this.stateFormVar;
  }

  buscarCliente() {
    // console.log(this.idCliente);
    this._clienteService.getCliente(this.idCliente).subscribe(datos => {
      this.nombreCliente = datos.nombres;
      this.cedulaCliente = datos.cedula;
      this.idCliente = datos.id;
      console.log(this.nombreCliente);
    });
  }

  buscarTour() {
    // console.log(this.idTour);
    this._toursService.getTour(this.idTour).subscribe(datos => {
      this.nombreTour = datos.tou_name;
      this.fechaTour = datos.tou_fecha;
      this.idTour = datos.id;
    });
  }

}

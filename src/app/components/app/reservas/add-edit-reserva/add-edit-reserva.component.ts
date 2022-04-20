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
      grp_id: [''],
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
        this.myForm.get('grp_id').disable();
      }
      else if (data === false) {
        this.myForm.get('grp_id').enable();
      }
    });
  }

  agregarReserva() {

    const RESERVA = {
      // rep_gr: this.myForm.get('rep_gr').value,
      // grp_id: this.myForm.get('id_gr').value,
      // obs_gr: this.myForm.get('obs_gr').value,
      CTA_ID: 0,
      TOU_ID: this.idTour,
      CLN_ID: this.idCliente,
      RES_ACOM: this.myForm.get('sup_acom').value,
      RES_EXTRA: this.myForm.get('sup_extra').value,
      RES_FECHA_ABONO1: this.myForm.get('fecha_abono1').value,
      RES_FECHA_ABONO2: this.myForm.get('fecha_abono2').value,
      RES_FECHA_ABONO3: this.myForm.get('fecha_abono3').value,
      RES_ABONO1: this.myForm.get('valor_abono1').value,
      RES_ABONO2: this.myForm.get('valor_abono2').value,
      RES_ABONO3: this.myForm.get('valor_abono3').value,
      RES_CUEN_ABONO1: this.myForm.get('lugar_abono1').value,
      RES_CUEN_ABONO2: this.myForm.get('lugar_abono2').value,
      RES_CUEN_ABONO3: this.myForm.get('lugar_abono3').value,
      RES_OBSERVACIONES: this.myForm.get('obs').value
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
      this.nombreCliente = datos.CLN_NOMBRE;
      this.cedulaCliente = datos.CLN_CEDULA;
      this.idCliente = datos.CLN_ID;
      this.nombreTour = datos.TOU_NOMBRE;
      this.fechaTour = datos.TOU_FECHA;
      this.idTour = datos.TOU_ID;
      this.myForm.patchValue({
        // id_gr: datos.grp_id,
        // rep_gr: datos.rep_gr,
        // obs_gr: datos.obs_gr,
        sup_acom: datos.RES_ACOM,
        sup_extra: datos.RES_EXTRA,
        fecha_abono1: datos.RES_FECHA_ABONO1,
        fecha_abono2: datos.RES_FECHA_ABONO2,
        fecha_abono3: datos.RES_FECHA_ABONO3,
        valor_abono1: datos.RES_ABONO1,
        valor_abono2: datos.RES_ABONO2,
        valor_abono3: datos.RES_ABONO3,
        lugar_abono1: datos.RES_CUEN_ABONO1,
        lugar_abono2: datos.RES_CUEN_ABONO2,
        lugar_abono3: datos.RES_CUEN_ABONO3,
        obs: datos.RES_OBSERVACIONES
      })
    });
  }

  stateForm(){
    this.stateFormVar = !this.stateFormVar;
  }

  buscarCliente() {
    // console.log(this.idCliente);
    this._clienteService.getClienteReserva(this.cedulaCliente).subscribe(datos => {
      this.nombreCliente = datos.CLN_NOMBRE;
      this.cedulaCliente = datos.CLN_CEDULA;
      this.idCliente = datos.CLN_ID;
      // console.log(this.nombreCliente);
    });
  }

  buscarTour() {
    // console.log(this.idTour);
    this._toursService.getTour(this.idTour).subscribe(datos => {
      this.nombreTour = datos.TOU_NOMBRE;
      this.fechaTour = datos.TOU_FECHA;
      this.idTour = datos.TOU_ID;
    });
  }

}

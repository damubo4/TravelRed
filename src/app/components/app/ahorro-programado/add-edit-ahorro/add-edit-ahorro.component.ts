import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { AhorroService } from 'src/app/services/ahorro/ahorro.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { CuentasService } from 'src/app/services/cuentas/cuentas.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { ToursService } from 'src/app/services/tours/tours.service';

@Component({
  selector: 'app-add-edit-ahorro',
  templateUrl: './add-edit-ahorro.component.html',
  styleUrls: ['./add-edit-ahorro.component.css']
})
export class AddEditAhorroComponent implements OnInit {

  myForm: FormGroup
  idAhorro: any;
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
              private _cuentasService: CuentasService,
              private _reservasService: ReservasService,
              private _ahorrosService: AhorroService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {

    this.myForm = this.fb.group({
      tou_id: [''],
      cln_id: [''],
      rep_gr: [''],
      grp_id: [''],
      obs_gr: [''],
      aho_acom: [''],
      aho_extra: [''],
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

    this.idAhorro = this.aRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    if (this.idAhorro !== undefined) {
      this.accion = 'Editar';
      this.buttonState = false;
      this.stateFormVar = true;
      this.editarAhorro();
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

  agregarAhorro() {

    const AHORRO = {
      id:  this.myForm.get('rep_gr').value,
      tou_id: this.idTour,
      cln_id: this.idCliente,
      rep_gr: this.myForm.get('rep_gr').value,
      grp_id: this.myForm.get('grp_id').value,
      obs_gr: this.myForm.get('obs_gr').value,
      aho_acom: this.myForm.get('aho_acom').value,
      aho_extra: this.myForm.get('aho_extra').value,
      aho_fecha1: this.myForm.get('fecha_abono1').value,
      aho_fecha2: this.myForm.get('fecha_abono2').value,
      aho_fecha3: this.myForm.get('fecha_abono3').value,
      aho_abono1: this.myForm.get('valor_abono1').value,
      aho_abono2: this.myForm.get('valor_abono2').value,
      aho_abono3: this.myForm.get('valor_abono3').value,
      aho_lugar1: this.myForm.get('lugar_abono1').value,
      aho_lugar2: this.myForm.get('lugar_abono2').value,
      aho_lugar3: this.myForm.get('lugar_abono3').value,
      aho_obs: this.myForm.get('obs').value
    }

    if (this.idAhorro !== undefined){

      this._ahorrosService.editAhorro(this.idAhorro, AHORRO).subscribe(datos =>{
        this.snackBar.open('El registro ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/ahorros'])
      }), error => {
        this.myForm.reset();
      }

    } else {

      this._ahorrosService.addAhorro(AHORRO).subscribe(datos => {
        this.snackBar.open('El ahorro fue registrado con éxito','', {
          duration: 3000
          });
        this.route.navigate(['/ahorros'])
      }), error => {
        this.myForm.reset();
      }
    }
  }

  editarAhorro() {
    this._ahorrosService.getAhorro(this.idAhorro).subscribe(datos => {
      console.log(datos);
      this.nombreCliente = 'datos.nombreCliente';
      this.cedulaCliente = 13134;
      this.idCliente = 123;
      this.nombreTour = 'datos.nombreCliente';
      this.fechaTour = datos.res_fecha1;
      this.idTour = 1343;

      this.myForm.patchValue({
        grp_id: datos.grp_id,
        rep_gr: datos.rep_gr,
        obs_gr: datos.obs_gr,
        aho_acom: datos.aho_acom,
        aho_extra: datos.aho_extra,
        fecha_abono1: datos.aho_fecha1,
        fecha_abono2: datos.aho_fecha2,
        fecha_abono3: datos.aho_fecha3,
        valor_abono1: datos.aho_abono1,
        valor_abono2: datos.aho_abono2,
        valor_abono3: datos.aho_abono3,
        lugar_abono1: datos.aho_lugar1,
        lugar_abono2: datos.aho_lugar2,
        lugar_abono3: datos.aho_lugar3,
        obs: datos.aho_obs
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
      // console.log(this.nombreCliente);
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

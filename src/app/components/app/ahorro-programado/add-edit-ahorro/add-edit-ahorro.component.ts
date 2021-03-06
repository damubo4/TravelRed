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
              private _ahorrosService: AhorroService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {

    this.myForm = this.fb.group({      
      grp_id: [''],
      rep_gr: [''],
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
      // rep_gr: this.myForm.get('rep_gr').value,
      // grp_id: this.myForm.get('id_gr').value,
      // obs_gr: this.myForm.get('obs_gr').value,  
      TOU_ID: this.idTour,
      CLN_ID: this.idCliente,      
      AHO_ACOM: this.myForm.get('aho_acom').value,
      AHO_EXTRA: this.myForm.get('aho_extra').value,
      AHO_FECHA_ABONO1: this.myForm.get('fecha_abono1').value,
      AHO_FECHA_ABONO2: this.myForm.get('fecha_abono2').value,
      AHO_FECHA_ABONO3: this.myForm.get('fecha_abono3').value,
      AHO_ABONO1: this.myForm.get('valor_abono1').value,
      AHO_ABONO2: this.myForm.get('valor_abono2').value,
      AHO_ABONO3: this.myForm.get('valor_abono3').value,
      AHO_CUEN_ABONO1: this.myForm.get('lugar_abono1').value,
      AHO_CUEN_ABONO2: this.myForm.get('lugar_abono2').value,
      AHO_CUEN_ABONO3: this.myForm.get('lugar_abono3').value,
      AHO_OBSERVACIONES: this.myForm.get('obs').value
    }

    if (this.idAhorro !== undefined){

      this._ahorrosService.editAhorro(this.idAhorro, AHORRO).subscribe(datos =>{
        this.snackBar.open('El registro ha sido editado con ??xito','', {
          duration: 3000
          });
          this.route.navigate(['/ahorros'])
      }), error => {
        this.myForm.reset();
      }

    } else {

      this._ahorrosService.addAhorro(AHORRO).subscribe(datos => {
        this.snackBar.open('El ahorro fue registrado con ??xito','', {
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
        aho_acom: datos.AHO_ACOM,
        aho_extra: datos.AHO_EXTRA,
        fecha_abono1: datos.AHO_FECHA_ABONO1,
        fecha_abono2: datos.AHO_FECHA_ABONO2,
        fecha_abono3: datos.AHO_FECHA_ABONO3,
        valor_abono1: datos.AHO_ABONO1,
        valor_abono2: datos.AHO_ABONO2,
        valor_abono3: datos.AHO_ABONO3,
        lugar_abono1: datos.AHO_CUEN_ABONO1,
        lugar_abono2: datos.AHO_CUEN_ABONO2,
        lugar_abono3: datos.AHO_CUEN_ABONO3,
        obs: datos.AHO_OBSERVACIONES
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

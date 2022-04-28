import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToursService } from 'src/app/services/tours/tours.service';

@Component({
  selector: 'app-add-edit-tour',
  templateUrl: './add-edit-tour.component.html',
  styleUrls: ['./add-edit-tour.component.css']
})
export class AddEditTourComponent implements OnInit {

  myForm: FormGroup;
  idTour: any;
  accion = 'Agregar';

  constructor(private fb: FormBuilder,
              private _toursService: ToursService,
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute ) {

    this.myForm = this.fb.group({
      tou_name: [''],
      tou_tipo: [''],
      tou_fecha: [''],
      tou_valorNeto: ['',],
      tou_valorCom: ['',],
      tou_obs: ['']
    });

    this.idTour = this.aRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
    if (this.idTour !== undefined) {
      this.accion = 'Editar';
      this.editarTour();
    }
  }

  agregarTour() {

    const TOUR = {
      tou_nombre: this.myForm.get('tou_name').value,
      tou_tipo: this.myForm.get('tou_tipo').value,
      tou_fecha: this.myForm.get('tou_fecha').value,
      tou_valorneto: this.myForm.get('tou_valorNeto').value,
      tou_valorcomisionable: this.myForm.get('tou_valorCom').value,
      tou_observaciones: this.myForm.get('tou_obs').value
    }

    if (this.idTour !== undefined){

      this._toursService.editTour(this.idTour, TOUR).subscribe(datos =>{
        this.snackBar.open('El Tour ha sido editado con éxito','', {
          duration: 3000
          });
          this.route.navigate(['/tours'])
      }), error => {
        this.myForm.reset();
      }

    } else {

      this._toursService.addTour(TOUR).subscribe(datos => {
        this.snackBar.open('El Tour fue registrado con éxito','', {
          duration: 3000
          });
        this.route.navigate(['/tours'])
      }), error => {
        this.myForm.reset();
      }
    }
  }

  editarTour() {
    this._toursService.getTour(this.idTour).subscribe(datos => {
      this.myForm.patchValue({
        tou_name: datos.TOU_NOMBRE,
        tou_tipo: datos.TOU_TIPO,
        tou_fecha: datos.TOU_FECHA,
        tou_valorNeto: datos.TOU_VALORNETO,
        tou_valorCom: datos.TOU_VALORCOMISIONABLE,
        tou_obs: datos.TOU_OBSERVACIONES
      })
    });
  }

}

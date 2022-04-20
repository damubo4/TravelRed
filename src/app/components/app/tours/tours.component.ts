import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToursService } from 'src/app/services/tours/tours.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'id_tour', 'nombreTour', 'fechaTour', 'tipoTour', 'valorNeto', 'valorComisionable', 'observacion', 'acciones'];
  dataSourceTours = new MatTableDataSource();
  listTours = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _toursService: ToursService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTours();
  }

  getTours(): void {
      this._toursService.getTours().subscribe(datos => {

          this.listTours = datos;
          this.dataSourceTours = new MatTableDataSource(this.listTours);
          this.dataSourceTours.paginator = this.paginator;
          this.dataSourceTours.sort = this.sort;
          console.log(datos);

    }, error => {
      console.log(error);
    });
  }

  eliminarTour(id: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el cliente?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {

        this._toursService.deleteTour(id).subscribe(datos => {
          this.getTours();
          this.snackBar.open('El Tour fue eliminado con éxito','', {
          duration: 3000
          });

        }, error => {
          console.log("hubo un error");

        })
      }
    });
}

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceTours.filter = filterValue.trim().toLowerCase();
    }

}






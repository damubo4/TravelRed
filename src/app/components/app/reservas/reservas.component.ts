import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { Clientes } from 'src/app/models/clientes';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservasService } from 'src/app/services/reservas/reservas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'nombres_cliente', 'cedula_cliente', 'celular_cliente', 'nombre_tour', 'fecha_tour', 'Acom', 'Extra', 'abono1', 'abono2', 'abono3', 'fechaabono1', 'fechaabono2', 'fechaabono3', 'lugarabono1', 'lugarabono2', 'lugarabono3', 'observación', 'acciones'];
  dataSourceReservas = new MatTableDataSource();
  dataSourceClientes = new MatTableDataSource();
  listReservas = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _reservasService: ReservasService,
              public dialog: MatDialog,
              private _clientesService: ClientesService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(): void {
      this._reservasService.getReservas().subscribe(datos => {

          this.listReservas = datos;
          this.dataSourceReservas = new MatTableDataSource(this.listReservas);
          this.dataSourceReservas.paginator = this.paginator;
          this.dataSourceReservas.sort = this.sort;
          // console.log(datos);

    }, error => {
      console.log(error);
    });
  }

  eliminarReserva(index: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el cliente?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {

        this._reservasService.deleteReserva(index).subscribe(datos => {
          this.getReservas();
          this.snackBar.open('El Cliente fue eliminado con éxito','', {
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
      this.dataSourceReservas.filter = filterValue.trim().toLowerCase();
    }

}

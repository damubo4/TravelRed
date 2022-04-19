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
import { AhorroService } from 'src/app/services/ahorro/ahorro.service';

@Component({
  selector: 'app-ahorro-programado',
  templateUrl: './ahorro-programado.component.html',
  styleUrls: ['./ahorro-programado.component.css']
})
export class AhorroProgramadoComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'nombre_cliente', 'doc_cliente', 'cel_cliente', 'nombre_tour', 'fecha_tour', 'acom', 'extra', 'abono1', 'abono2', 'abono3', 'fechaabono1', 'fechaabono2', 'fechaabono3', 'lugarabono1', 'lugarabono2', 'lugarabono3', 'observación', 'acciones'];
  dataSourceAhorros = new MatTableDataSource();
  dataSourceClientes = new MatTableDataSource();
  listAhorros = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _ahorrosService: AhorroService,
              public dialog: MatDialog,
              private _clientesService: ClientesService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAhorros();
  }

  getAhorros(): void {
      this._ahorrosService.getAhorros().subscribe(datos => {

          this.listAhorros = datos;
          this.dataSourceAhorros = new MatTableDataSource(this.listAhorros);
          this.dataSourceAhorros.paginator = this.paginator;
          this.dataSourceAhorros.sort = this.sort;
          // console.log(datos);

    }, error => {
      console.log(error);
    });
  }

  eliminarAhorro(index: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el registro?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {

        this._ahorrosService.deleteAhorro(index).subscribe(datos => {
          this.getAhorros();
          this.snackBar.open('El item fue eliminado con éxito','', {
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
      this.dataSourceAhorros.filter = filterValue.trim().toLowerCase();
    }

}

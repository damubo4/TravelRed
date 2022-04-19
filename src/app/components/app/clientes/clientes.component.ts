import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from  '@angular/material/sort' ;
import { Clientes } from 'src/app/models/clientes';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['No.', 'nombres', 'apellidos', 'cedula', 'celular', 'edad', 'fecha_nac', 'correo', 'obs', 'acciones'];
  dataSource = new MatTableDataSource();
  listClientes:Clientes[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
  }

  constructor(private _clientesService: ClientesService, public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
      this._clientesService.getClientes().subscribe(datos => {
      this.listClientes = datos;
      this.dataSource = new MatTableDataSource(this.listClientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(datos);

    }, error => {
      console.log(error);
    });
  }

  eliminarCliente(index: any) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Estas seguro de eliminar el cliente?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {

        this._clientesService.deleteCliente(index).subscribe(datos => {
          this.getClientes();
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
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

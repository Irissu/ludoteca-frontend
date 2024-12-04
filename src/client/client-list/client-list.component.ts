import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientService } from '../client.service';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../model/Client';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent  implements OnInit{ // implements OnInit

  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
  ) { }
 /* funcion ngOnInit se ejecuta al renderizar para "suscribirse" al Observable del Service con los datos
 */
   ngOnInit(): void {
     console.log("this function is the OnInit");
     this.clientService.getClients().subscribe(clients => this.dataSource.data = clients);
  } 

createClient() {
  const dialogRef = this.dialog.open(ClientEditComponent, { //abre el componente
    data: {} //no es necesario pasarle datos
  });

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
  });  // cuando cerramos el modal recarga con ngOnInit la tabla
}

editClient(client: Client) {
  const dialogRef = this.dialog.open(ClientEditComponent, {
    data: { client }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit(); // para que despues de editar se actualice la tabla
  });
}

deleteClient(client: Client) {
  const dialogRef = this.dialog.open(DialogConfirmationComponent, {
    data: { title: "Eliminar cliente", description: "Atención si borra al cliente se perderán sus datos.<br> ¿Desea eliminar al cliente?"}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log("client id: "+ client.id);
    if (result) {
      this.clientService.deleteClient(client.id).subscribe(result => {
        this.ngOnInit();
      }); 
    }
  });
}


}
 
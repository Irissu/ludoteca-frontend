import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../model/Client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryEditComponent } from '../../category/category-edit/category-edit.component';
import { CLIENT_DATA } from '../model/mock-clients';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
  client: Client;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: {client: Client},
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
     this.client = this.data.client ? Object.assign({}, this.data.client): new Client(); 
  }

  onSave() {
    console.log("closing myself from onSave")
    this.clientService.saveClient(this.client).subscribe(() => {
      this.dialogRef.close();
    });
  }
  
  onClose() {
    console.log("closing myself from onClose")
    this.dialogRef.close();
  }
}

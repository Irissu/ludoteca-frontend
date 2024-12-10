import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Loan } from '../model/Loan';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/Client';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../client/client.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-loan-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss'
})
export class LoanEditComponent implements OnInit {
  loan: Loan;
  games: Game[];
  clients: Client[];



  constructor( 
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService
    )
    {}

    ngOnInit(): void {
      this.loan = this.data.loan ? Object.assign({}, this.data.loan) : new Loan();

      this.gameService.getGames().subscribe((games)=>{
        this.games = games
      });

      this.clientService.getClients().subscribe((clients) => {
        this.clients = clients;
      });
    }

    onSave() {
      this.loanService.saveLoan(this.loan).subscribe(() => {
        this.dialogRef.close();
      });
    }

    onClose() {
      this.dialogRef.close();
    }
}

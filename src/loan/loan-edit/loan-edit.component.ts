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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-loan-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './loan-edit.component.html',
  styleUrl: './loan-edit.component.scss'
})
export class LoanEditComponent implements OnInit {
  loan: Loan;
  games: Game[];
  clients: Client[];
  errors: { [key: string]: string } = {};

  showErrorsInRealTime() {
    console.log('this.errors', this.errors);
  }

  constructor( 
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
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
    changeTimeZone = (date: Date): Date => { 
      const timeZoneOffset = date.getTimezoneOffset();
      return new Date(date.getTime() - timeZoneOffset * 60000); 
    };

    validateDates(): boolean {
      this.errors = {};
  
      if (!this.loan.loanDate) {
        this.errors['loanDate'] = 'La fecha de prestamo es obligatoria';
      } else {
        this.loan.loanDate = this.changeTimeZone(this.loan.loanDate);
      }
  
      if (!this.loan.returnDate) {
        this.errors['returnDate'] = 'La fecha de devolucion es obligatoria';
      } else {
        this.loan.returnDate = this.changeTimeZone(this.loan.returnDate);
      }
  
      if (this.loan.returnDate && this.loan.loanDate && this.loan.returnDate < this.loan.loanDate) {
        this.errors['returnDate'] = 'La fecha de devolucion no puede ser anterior a la fecha de prestamo';
      }
  
      const diffTime = Math.abs(this.loan.returnDate.getTime() - this.loan.loanDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 14) {
        this.errors['returnDate'] = 'La diferencia entre la fecha de prestamo y la fecha de devolucion no puede ser mayor a 14 dias';
      }
  
      return Object.keys(this.errors).length === 0;
    }
    onSave() { 
    
      if (!this.validateDates()) {
        return;
      }
      
      this.loanService.saveLoan(this.loan).subscribe(() => {
        this.dialogRef.close();
      });
    }

    onClose() {
      this.dialogRef.close();
    }

    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0'); 
  
      return `${year}-${month}-${day}`;
    }
}

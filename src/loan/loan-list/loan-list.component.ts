import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/Pageable';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Game } from '../../game/model/Game';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Client } from '../../client/model/Client';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../client/client.service';



@Component({
  selector: 'app-loan-list',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule, MatPaginator, MatIconModule, FormsModule, MatFormField, MatInputModule, MatSelectModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})

export class LoanListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  filterGame: Game;
  filterClient: Client;
  filterDate: Date;
  clients: Client[];
  games: Game[];

  // elementos de la tabla
  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'loanDate', 'returnDate', 'action'];

  constructor(
    private loanService: LoanService, 
    private gameService: GameService,
    private clientService: ClientService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}
  
  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => (this.games = games));
    this.clientService.getClients().subscribe((clients) => (this.clients = clients));
    this.loadPage();
  }

  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  
  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };
    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }


    // filtros
    const gameId = this.filterGame != null ? this.filterGame.id : null;
    const clientId  = this.filterClient != null ? this.filterClient.id : null;
    const date = this.filterDate != null ? this.formatDate(this.filterDate) : null;


    console.log('date is', date);
    

    console.log('Applying filters:', gameId, clientId , date);

    this.loanService.getLoans(pageable, gameId, clientId, date).subscribe((data) => {
      console.log('Filtered data:', data);
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  onCleanFilter(): void {
  
    this.filterClient = null;
    this.filterGame = null;
    this.filterDate = null;
    this.onSearch(); 
  }

  onSearch(): void {
    console.log("Buscando...");
   this.pageNumber = 0;
   this.loadPage();
  }

  // create y delete
  createLoan() {
    const dialogRef = this.dialog.open( LoanEditComponent, {
      data : {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open( DialogConfirmationComponent, {
      data : {
        Title: 'Eliminar préstamo',
        description : 'Si borra este prestamo se borraran los datos. <br> ¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.loanService.deleteLoan(loan.id).subscribe((result) => {
          this.ngOnInit();
        })
      }
    });
  }
}

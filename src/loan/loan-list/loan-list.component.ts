import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/Pageable';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { Title } from '@angular/platform-browser';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CommonModule, MatPaginator, MatIconModule],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'loanDate', 'returnDate', 'action'];

  constructor(private loanService: LoanService, public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.loadPage();
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

    this.loanService.getLoans(pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

    
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

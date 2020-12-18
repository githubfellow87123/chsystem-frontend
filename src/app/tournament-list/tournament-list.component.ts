import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TournamentModel, TournamentService } from '../tournament.service';
import { Router } from '@angular/router';
import { ErrorSnackBarComponent } from '../common/error-snack-bar/error-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss'],
})
export class TournamentListComponent implements AfterViewInit {
  currentTournamentDate = new Date();

  displayedColumns: string[] = ['id', 'date', 'state', 'view', 'delete'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public tournamentService: TournamentService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.tournamentService
      .getTournaments()
      .subscribe((tournaments) => (this.dataSource.data = tournaments));
  }

  addTournament(date: Date): void {
    // TODO There seems to be something wrong with the time zone of the date
    // Setting the hours of the Date is a hack to make sure we don't skip a day
    // Actually a number is passed here and not a date
    const newDate = new Date(date);
    newDate.setHours(10);
    const tournamentModel: TournamentModel = {
      date: newDate,
    };

    this.tournamentService
      .addTournament(tournamentModel)
      .subscribe((tournament) => {
        this.dataSource.data.push(tournament);
        this.dataSource.data = [...this.dataSource.data];
      });
  }

  deleteTournament(tournamentId: string): void {
    this.tournamentService.deleteTournament(tournamentId).subscribe(
      () => {
        const index = this.dataSource.data.findIndex(
          (tournament) => tournament.id === tournamentId
        );
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      },
      (error) => {
        this.snackBar.openFromComponent(ErrorSnackBarComponent, {
          data: error.error.message,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }

  view(id: string): void {
    this.router.navigateByUrl(this.router.url + '/' + id);
  }
}

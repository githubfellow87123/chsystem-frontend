import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TournamentModel, TournamentService} from '../tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'date', 'state', 'delete'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public tournamentService: TournamentService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.tournamentService.getTournaments()
      .subscribe(tournaments => this.dataSource.data = tournaments);
  }

  addTournament(): void {
    const tournamentModel: TournamentModel = {
      date: new Date('2021-12-27')
    };

    this.tournamentService.addTournament(tournamentModel)
      .subscribe(tournament => {
        this.dataSource.data.push(tournament);
        this.dataSource.data = [...this.dataSource.data];
      });
  }

  deleteTournament(tournamentId: string): void {
    this.tournamentService.deleteTournament(tournamentId)
      .subscribe(() => {
        const index = this.dataSource.data.findIndex(tournament => tournament.id === tournamentId);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      });
  }
}

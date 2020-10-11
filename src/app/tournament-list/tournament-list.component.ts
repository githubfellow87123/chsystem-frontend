import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TournamentService} from '../tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'date', 'state', 'delete'];
  dataSource = new MatTableDataSource(this.tournamentService.tournaments);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public tournamentService: TournamentService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addTournament(): void {
    this.tournamentService.addTournament();
    this.dataSource.data = this.tournamentService.tournaments;
  }

  deleteTournament(id: string): void {
    this.tournamentService.deleteTournament(id);
    this.dataSource.data = this.tournamentService.tournaments;
  }
}

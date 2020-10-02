import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TournamentListService} from '../tournament-list.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'date', 'state', 'delete'];
  dataSource = new MatTableDataSource(this.tournamentListService.tournaments);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public tournamentListService: TournamentListService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addTournament(): void {
    this.tournamentListService.addTournament();
    this.dataSource.data = this.tournamentListService.tournaments;
  }

  deleteTournament(id: string): void {
    this.tournamentListService.deleteTournament(id);
    this.dataSource.data = this.tournamentListService.tournaments;
  }
}

import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  StandingsModel,
  TournamentModel,
  TournamentService,
} from '../../tournament.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tournament-standings',
  templateUrl: './tournament-standings.component.html',
  styleUrls: ['./tournament-standings.component.scss'],
})
export class TournamentStandingsComponent implements OnChanges {
  @Input()
  tournament: TournamentModel;

  displayedColumns: string[] = [
    'rank',
    'playerName',
    'score',
    'matchStats',
    'opponentAverageScore',
    'gameStats',
    'gameWinPercentage',
    'opponentAverageGameWinPercentage',
  ];
  dataSource = new MatTableDataSource<StandingsModel>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tournamentService: TournamentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tournament != null) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.tournamentService
        .getStandings(this.tournament.id)
        .subscribe((standings) => {
          for (let i = 0; i < standings.length; i++) {
            const standing = standings[i];
            standing.rank = i + 1;
          }
          return (this.dataSource.data = standings);
        });
    }
  }
}

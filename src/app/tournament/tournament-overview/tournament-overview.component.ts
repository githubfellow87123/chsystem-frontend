import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  TournamentModel,
  TournamentService,
  TournamentState,
} from '../../tournament.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from '../../common/error-snack-bar/error-snack-bar.component';

@Component({
  selector: 'app-tournament-overview',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.scss'],
})
export class TournamentOverviewComponent implements OnInit {
  @Input()
  tournament: TournamentModel;

  @Output() tournamentChangeEvent = new EventEmitter<TournamentModel>();

  tournamentState = TournamentState;

  constructor(
    private tournamentService: TournamentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  startTournament(tournamentId: string): void {
    this.tournamentService.startTournament(tournamentId).subscribe(
      (tournament) => {
        this.tournament = tournament;
        this.tournamentChangeEvent.emit(tournament);
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

  startNextRound(tournamentId: string): void {
    this.tournamentService.startNextRound(tournamentId).subscribe(
      (tournament) => {
        this.tournament = tournament;
        this.tournamentChangeEvent.emit(tournament);
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

  finishTournament(tournamentId: string): void {
    this.tournamentService.finishTournament(tournamentId).subscribe(
      (tournament) => {
        this.tournament = tournament;
        this.tournamentChangeEvent.emit(tournament);
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
}

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
export class TournamentOverviewComponent {
  @Input()
  tournament!: TournamentModel;

  @Output() tournamentChangeEvent = new EventEmitter<TournamentModel>();

  tournamentState = TournamentState;

  constructor(
    private tournamentService: TournamentService,
    private snackBar: MatSnackBar
  ) {}

  startTournament(tournamentId: string | undefined): void {
    if (!tournamentId) return;
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

  startNextRound(tournamentId: string | undefined): void {
    if (!tournamentId) return;
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

  finishTournament(tournamentId: string | undefined): void {
    if (!tournamentId) return;
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

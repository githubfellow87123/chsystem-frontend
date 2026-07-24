import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Match,
  MatchResultModel,
  TournamentModel,
  TournamentService,
  TournamentState,
} from '../../tournament.service';
import { KeyValue } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorSnackBarComponent } from '../../common/error-snack-bar/error-snack-bar.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tournament-matches',
  templateUrl: './tournament-matches.component.html',
  styleUrls: ['./tournament-matches.component.scss'],
})
export class TournamentMatchesComponent implements OnChanges {
  @Input()
  tournament!: TournamentModel;

  @Output() matchesChangedEvent = new EventEmitter();
  @Output() tournamentChangeEvent = new EventEmitter<TournamentModel>();

  matchesCurrentRound: Match[] = [];
  matchesPreviousRounds: Map<number, Match[]> = new Map();

  tournamentState = TournamentState;

  constructor(
    private tournamentService: TournamentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tournament != null) {
      this.tournamentService
        .getMatches(this.tournament.id!)
        .subscribe((matches) => {
          this.matchesCurrentRound = matches.filter(
            (match) => match.roundIndex === this.tournament.roundIndex
          );
          this.matchesPreviousRounds = this.getMatchesPreviousRounds(matches);
        });
    }
  }

  enterMatchResults(): void {
    this.matchesCurrentRound.forEach((match) => {
      if (match.winsPlayer1 != null && match.winsPlayer2 != null) {
        this.enterMatchResult(match);
      }
    });
  }

  private enterMatchResult(match: Match): void {
    const matchResult: MatchResultModel = {
      id: match.id,
      winsPlayer1: match.winsPlayer1 ?? 0,
      winsPlayer2: match.winsPlayer2 ?? 0,
    };

    this.tournamentService
      .enterMatchResult(match.tournamentId, matchResult)
      .subscribe(() => this.matchesChangedEvent.emit());
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
          data: error,
          panelClass: 'error-snack-bar-panel',
          duration: 8000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }

  finishTournament(tournamentId: string | undefined): void {
    if (!tournamentId) return;
    const dialogData: ConfirmDialogData = {
      title: 'Finish Tournament',
      message:
        'Do you really want to finish this tournament? This cannot be undone.',
      confirmText: 'Finish',
      cancelText: 'Cancel',
    };
    this.dialog
      .open(ConfirmDialogComponent, { data: dialogData })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return;
        this.tournamentService.finishTournament(tournamentId).subscribe(
          (tournament) => {
            this.tournament = tournament;
            this.tournamentChangeEvent.emit(tournament);
          },
          (error) => {
            this.snackBar.openFromComponent(ErrorSnackBarComponent, {
              data: error,
              panelClass: 'error-snack-bar-panel',
          duration: 8000,
          verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        );
      });
  }

  private getMatchesPreviousRounds(allMatches: Match[]): Map<number, Match[]> {
    const matchesPreviousRoundsArray = allMatches.filter((match) => {
      if (this.tournament.state === TournamentState.DONE) {
        return true;
      } else {
        return match.roundIndex < (this.tournament.roundIndex ?? 0);
      }
    });

    const matchesPreviousRounds = new Map<number, Match[]>();

    if (this.tournament.state === TournamentState.DONE) {
      for (let i = 1; i <= (this.tournament.roundIndex ?? 0); i++) {
        matchesPreviousRounds.set(i, []);
      }
    } else {
      for (let i = 1; i < (this.tournament.roundIndex ?? 0); i++) {
        matchesPreviousRounds.set(i, []);
      }
    }

    matchesPreviousRoundsArray.forEach((match) => {
      const matchesOfRound = matchesPreviousRounds.get(match.roundIndex);
      if (matchesOfRound) {
        matchesOfRound.push(match);
      }
    });

    return matchesPreviousRounds;
  }

  keyDescOrder = (
    a: KeyValue<number, Match[]>,
    b: KeyValue<number, Match[]>
  ): number => {
    return a.key > b.key ? -1 : b.key > a.key ? 1 : 0;
  };
}

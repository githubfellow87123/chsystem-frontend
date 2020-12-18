import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Player, PlayerService } from '../../player.service';
import {
  TournamentModel,
  TournamentService,
  TournamentState,
} from '../../tournament.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from '../../common/error-snack-bar/error-snack-bar.component';

@Component({
  selector: 'app-tournament-players',
  templateUrl: './tournament-players.component.html',
  styleUrls: ['./tournament-players.component.scss'],
})
export class TournamentPlayersComponent implements OnInit, OnChanges {
  @Input()
  tournament: TournamentModel;

  playersInTournament: Player[];
  playersNotInTournament: Player[];
  playersOrderedBySeatingOrder: Player[];

  playersNotInTournamentFormControl = new FormControl();
  filteredPlayersNotInTournamentOptions: Observable<string[]>;

  constructor(
    private tournamentService: TournamentService,
    private playerService: PlayerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tournament != null) {
      this.playerService.getPlayers().subscribe((allPlayers) => {
        this.playersNotInTournament = allPlayers;
        this.tournamentService
          .getPlayersOfTournament(this.tournament.id)
          .subscribe((playersInTournament) => {
            this.playersInTournament = playersInTournament;
            this.removePlayersFromPlayersNotInTournament(playersInTournament);

            this.filteredPlayersNotInTournamentOptions = this.playersNotInTournamentFormControl.valueChanges.pipe(
              startWith(''),
              map((value) => this.filterPlayerNamesBySelectValue(value))
            );
          });
      });
    }

    if (
      this.tournament != null &&
      this.tournament.state === TournamentState.IN_PROGRESS
    ) {
      this.tournamentService
        .getSeatingOrder(this.tournament.id)
        .subscribe((players) => (this.playersOrderedBySeatingOrder = players));
    }
  }

  private removePlayersFromPlayersNotInTournament(players: Player[]): void {
    for (const playerInTournament of players) {
      this.playersNotInTournament = this.playersNotInTournament.filter(
        (player) => player.id !== playerInTournament.id
      );
    }
  }

  private filterPlayerNamesBySelectValue(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.playersNotInTournament
      .map((player) => player.name)
      .filter(
        (playerName) => playerName.toLowerCase().indexOf(filterValue) === 0
      );
  }

  addPlayerToTournament(): void {
    const playerName = this.playersNotInTournamentFormControl.value;

    const index = this.playersNotInTournament.findIndex(
      (playerNotInTournament) => playerNotInTournament.name === playerName
    );
    const player = this.playersNotInTournament[index];

    this.tournamentService
      .assignPlayerToTournament(this.tournament.id, player.id)
      .subscribe(
        () => {
          this.playersNotInTournament.splice(index, 1);
          this.playersInTournament.push(player);
          this.playersInTournament = this.sortBy(
            this.playersInTournament,
            'name'
          );
          this.playersInTournament = [...this.playersInTournament];
          this.playersNotInTournamentFormControl.patchValue('');
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

  removePlayerFromTournament(player: Player): void {
    const index = this.playersInTournament.findIndex(
      (playerInTournament) => playerInTournament.id === player.id
    );

    this.tournamentService
      .removePlayerFromTournament(this.tournament.id, player.id)
      .subscribe(
        () => {
          this.playersInTournament.splice(index, 1);
          this.playersInTournament = [...this.playersInTournament];
          this.playersNotInTournament.push(player);
          this.playersNotInTournament = this.sortBy(
            this.playersNotInTournament,
            'name'
          );
          this.playersNotInTournamentFormControl.patchValue('');
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

  sortBy(players: Player[], prop: string): Player[] {
    return players.sort((player1, player2) =>
      player1[prop] > player2[prop]
        ? 1
        : player1[prop] === player2[prop]
        ? 0
        : -1
    );
  }
}

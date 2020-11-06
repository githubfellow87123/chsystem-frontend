import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Player, PlayerService } from '../../player.service';
import { TournamentModel, TournamentService } from '../../tournament.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-players',
  templateUrl: './tournament-players.component.html',
  styleUrls: ['./tournament-players.component.scss'],
})
export class TournamentPlayersComponent implements OnInit {
  @Input()
  tournamentId: string;

  playersInTournament: Player[];
  playersNotInTournament: Player[];

  playersNotInTournamentFormControl = new FormControl();
  filteredPlayersNotInTournamentOptions: Observable<string[]>;

  options: string[] = ['One', 'Two', 'Three'];

  constructor(
    private tournamentService: TournamentService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe((allPlayers) => {
      this.playersNotInTournament = allPlayers;
      this.tournamentService
        .getPlayersOfTournament(this.tournamentId)
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

  addPlayersToTournament(): void {
    const playerName = this.playersNotInTournamentFormControl.value;

    const index = this.playersNotInTournament.findIndex(
      (playerNotInTournament) => playerNotInTournament.name === playerName
    );
    const player = this.playersNotInTournament[index];

    this.tournamentService
      .assignPlayerToTournament(this.tournamentId, player.id)
      .subscribe(() => {
        this.playersNotInTournament.splice(index, 1);
        this.playersInTournament.push(player);
        this.playersInTournament = this.sortBy(
          this.playersInTournament,
          'name'
        );
        this.playersNotInTournamentFormControl.patchValue('');
      });
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

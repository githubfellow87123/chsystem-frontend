import { Component, Input, OnInit } from '@angular/core';
import { Player, PlayerService } from '../../player.service';
import { TournamentModel, TournamentService } from '../../tournament.service';

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
          this.removePlayersFromPlayersNotInTournamentd(playersInTournament);
        });
    });
  }

  private removePlayersFromPlayersNotInTournamentd(players: Player[]): void {
    for (const playerInTournament of players) {
      this.playersNotInTournament = this.playersNotInTournament.filter(
        (player) => player.id !== playerInTournament.id
      );
    }
  }
}

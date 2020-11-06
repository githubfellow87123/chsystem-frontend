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
    this.tournamentService
      .getPlayersOfTournament(this.tournamentId)
      .subscribe((players) => (this.playersInTournament = players));
    this.playerService
      .getPlayers()
      .subscribe((players) => (this.playersNotInTournament = players));
  }
}

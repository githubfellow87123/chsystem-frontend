import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TournamentModel, TournamentService } from '../../tournament.service';

@Component({
  selector: 'app-tournament-overview',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.scss'],
})
export class TournamentOverviewComponent implements OnInit {
  @Input()
  tournament: TournamentModel;

  @Output() tournamentChangeEvent = new EventEmitter<TournamentModel>();

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {}

  startTournament(tournamentId: string): void {
    this.tournamentService
      .startTournament(tournamentId)
      .subscribe((tournament) => {
        this.tournament = tournament;
        this.tournamentChangeEvent.emit(tournament);
      });
  }

  startNextRound(tournamentId: string): void {
    this.tournamentService
      .startNextRound(tournamentId)
      .subscribe((tournament) => {
        this.tournament = tournament;
        this.tournamentChangeEvent.emit(tournament);
      });
  }

  finishTournament(tournamentId: string): void {
    this.tournamentService
      .finishTournament(tournamentId)
      .subscribe((tournament) => {
        this.tournament = tournament;
        this.tournamentChangeEvent.emit(tournament);
      });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { TournamentModel, TournamentService } from '../../tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-overview',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.scss'],
})
export class TournamentOverviewComponent implements OnInit {
  @Input()
  tournament: TournamentModel;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {}

  startTournament(tournamentId: string): void {
    this.tournamentService
      .startTournament(tournamentId)
      .subscribe((tournament) => {
        this.tournament = tournament;
      });
  }
}

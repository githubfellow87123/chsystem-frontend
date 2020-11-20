import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentModel, TournamentService } from '../tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent implements OnInit {
  id: string;
  tournament: TournamentModel;
  matchesChangedCounter = 0;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.tournamentService
        .getTournament(params.id)
        .subscribe((tournament) => (this.tournament = tournament));
    });
  }

  onTournamentChangedEvent(tournamentModel: TournamentModel): void {
    this.tournament = tournamentModel;
  }

  onMatchesChangedEvent(): void {
    this.matchesChangedCounter++;
  }
}

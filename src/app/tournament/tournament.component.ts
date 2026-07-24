import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  TournamentModel,
  TournamentService,
  TournamentState,
} from '../tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent implements OnInit {
  id!: string;
  tournament!: TournamentModel;
  matchesChangedCounter = 0;
  selectedIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.tournamentService
        .getTournament(params['id'])
        .subscribe((tournament) => (this.tournament = tournament));
    });
  }

  onTournamentChangedEvent(tournamentModel: TournamentModel): void {
    this.tournament = tournamentModel;
    if (tournamentModel.state === TournamentState.IN_PROGRESS) {
      this.selectedIndex = 1;
    }
  }

  onMatchesChangedEvent(): void {
    this.matchesChangedCounter++;
  }
}

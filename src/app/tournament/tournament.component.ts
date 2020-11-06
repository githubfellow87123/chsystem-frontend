import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentModel, TournamentService } from '../tournament.service';
import { Player } from '../player.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent implements OnInit {
  id: string;
  tournament: TournamentModel;

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
}

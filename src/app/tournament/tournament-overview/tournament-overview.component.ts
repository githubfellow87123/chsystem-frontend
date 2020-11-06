import { Component, Input, OnInit } from '@angular/core';
import { TournamentModel } from '../../tournament.service';

@Component({
  selector: 'app-tournament-overview',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.scss'],
})
export class TournamentOverviewComponent implements OnInit {
  @Input()
  tournament: TournamentModel;

  constructor() {}

  ngOnInit(): void {}
}

import {Component, OnInit} from '@angular/core';
import {TournamentListService} from '../tournament-list.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  constructor(public tournamentListService: TournamentListService) {
  }

  ngOnInit(): void {
  }

  addTournament(): void {
    this.tournamentListService.addTournament();
  }

}

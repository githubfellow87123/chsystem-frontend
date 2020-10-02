import {Component, Input, OnInit} from '@angular/core';
import {TournamentListItem, TournamentListService} from '../tournament-list.service';

@Component({
  selector: 'app-tournament-list-item',
  templateUrl: './tournament-list-item.component.html',
  styleUrls: ['./tournament-list-item.component.scss']
})
export class TournamentListItemComponent implements OnInit {

  @Input()
  public tournamentListItem!: TournamentListItem;

  constructor(public tournametListService: TournamentListService) {
  }

  ngOnInit(): void {
  }

  deleteItem(): void {
    this.tournametListService.deleteTournament(this.tournamentListItem);
  }
}

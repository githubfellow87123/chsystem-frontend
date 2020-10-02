import {Component, Input, OnInit} from '@angular/core';
import {PlayerListItem, PlayerListService} from '../player-list.service';

@Component({
  selector: 'app-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.scss']
})
export class PlayerListItemComponent implements OnInit {

  @Input()
  public playerListItem!: PlayerListItem;

  constructor(private playerListService: PlayerListService) { }

  ngOnInit(): void {
  }

  deleteItem(): void {
    this.playerListService.deletePlayer(this.playerListItem);
  }
}

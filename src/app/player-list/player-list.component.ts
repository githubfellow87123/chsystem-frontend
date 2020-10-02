import { Component, OnInit } from '@angular/core';
import {PlayerListService} from '../player-list.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  constructor(public playerListService: PlayerListService) { }

  ngOnInit(): void {
  }

  addPlayer(): void {
    this.playerListService.addPlayer();
  }
}

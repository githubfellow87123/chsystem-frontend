import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {
  public players: Array<PlayerListItem> = [];

  constructor() {
    this.players.push({
      id: 'eec7aaa9-9bbc-4781-bae3-399bef66ebf1',
      name: 'David'
    });
    this.players.push({
      id: '9dfe5f60-b3fc-4cd9-95d2-9e9bbdab67b4',
      name: 'Chris'
    });
  }

  addPlayer(): void {
    this.players.push({
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      name: 'Ernst'
    });
  }

  deletePlayer(id: string): void {
    const index = this.players.findIndex(player => player.id === id);
    this.players.splice(index, 1);
  }
}


export interface PlayerListItem {
  id: string;
  name: string;
}


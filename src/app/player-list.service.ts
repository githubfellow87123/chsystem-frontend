import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {

  // TODO This url should be defined somewhere else in a unique place
  private backendPlayersUrl = 'http://localhost:8080/players';

  public players: Array<PlayerListItem> = [];

  constructor(private httpClient: HttpClient) {
  }

  getPlayers(): Observable<Array<PlayerListItem>> {
    return this.httpClient.get<Array<PlayerListItem>>(this.backendPlayersUrl);
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
  createdAt?: Date;
}

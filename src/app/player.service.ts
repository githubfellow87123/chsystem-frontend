import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private backendPlayersUrl = environment.backendBaseUrl + '/players';

  constructor(private httpClient: HttpClient) {
  }

  getPlayers(): Observable<Array<Player>> {
    return this.httpClient.get<Array<Player>>(this.backendPlayersUrl);
  }

  addPlayer(playerModel: PlayerModel): Observable<Player> {
    return this.httpClient.post<Player>(this.backendPlayersUrl, playerModel);
  }

  deletePlayer(id: string): Observable<{}> {
    return this.httpClient.delete(this.backendPlayersUrl + '/' + id);
  }
}

export interface Player {
  id: string;
  name: string;
  createdAt: Date;
}

export interface PlayerModel {
  id?: string;
  name: string;
  createdAt?: Date;
}

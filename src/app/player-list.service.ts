import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {

  private backendPlayersUrl = environment.backendBaseUrl + '/players';

  constructor(private httpClient: HttpClient) {
  }

  getPlayers(): Observable<Array<PlayerListItem>> {
    return this.httpClient.get<Array<PlayerListItem>>(this.backendPlayersUrl);
  }

  addPlayer(playerModel: PlayerModel): Observable<PlayerListItem> {
    return this.httpClient.post<PlayerListItem>(this.backendPlayersUrl, playerModel);
  }

  deletePlayer(id: string): Observable<{}> {
    return this.httpClient.delete(this.backendPlayersUrl + '/' + id);
  }
}

export interface PlayerListItem {
  id: string;
  name: string;
  createdAt?: Date;
}

export interface PlayerModel {
  id?: string;
  name: string;
  createdAt?: Date;
}

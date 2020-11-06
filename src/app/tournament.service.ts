import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private backendTournamentsUrl = environment.backendBaseUrl + '/tournaments';

  constructor(private httpClient: HttpClient) {}

  getTournaments(): Observable<Array<Tournament>> {
    return this.httpClient.get<Array<Tournament>>(this.backendTournamentsUrl);
  }

  getTournament(tournamentId: string): Observable<Tournament> {
    return this.httpClient.get<Tournament>(
      this.backendTournamentsUrl + '/' + tournamentId
    );
  }

  addTournament(tournamentModel: TournamentModel): Observable<Tournament> {
    return this.httpClient.post<Tournament>(
      this.backendTournamentsUrl,
      tournamentModel
    );
  }

  deleteTournament(tournamentId: string): Observable<{}> {
    return this.httpClient.delete(
      this.backendTournamentsUrl + '/' + tournamentId
    );
  }

  getPlayersOfTournament(tournamentId: string): Observable<Array<Player>> {
    return this.httpClient.get<Array<Player>>(
      this.backendTournamentsUrl + '/' + tournamentId + '/players'
    );
  }

  assignPlayerToTournament(
    tournamentId: string,
    playerId: string
  ): Observable<PlayerToTournamentModel> {
    const playerToTournamentModel: PlayerToTournamentModel = {
      tournamentId,
      playerId,
    };
    return this.httpClient.put<PlayerToTournamentModel>(
      this.backendTournamentsUrl + '/' + tournamentId + '/players/' + playerId,
      playerToTournamentModel
    );
  }

  removePlayerFromTournament(
    tournamentId: string,
    playerId: string
  ): Observable<{}> {
    const playerToTournamentModel: PlayerToTournamentModel = {
      tournamentId,
      playerId,
    };
    return this.httpClient.request<PlayerToTournamentModel>(
      'delete',
      this.backendTournamentsUrl + '/' + tournamentId + '/players/' + playerId,
      { body: playerToTournamentModel }
    );
  }

  startTournament(tournamentId: string): Observable<Tournament> {
    return this.httpClient.put<Tournament>(
      this.backendTournamentsUrl + '/' + tournamentId + '/start',
      null
    );
  }
}

export interface Tournament {
  id: string;
  date: Date;
  state: TournamentState;
}

export interface TournamentModel {
  id?: string;
  date: Date;
  state?: TournamentState;
  roundIndex?: number;
}

enum TournamentState {
  INITIALIZING = 'Initializing',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export interface PlayerToTournamentModel {
  tournamentId: string;
  playerId: string;
}

import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

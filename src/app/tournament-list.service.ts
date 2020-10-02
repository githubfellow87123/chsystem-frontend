import {Injectable} from '@angular/core';
import {PlayerListItem} from './player-list.service';

@Injectable({
  providedIn: 'root'
})
export class TournamentListService {
  public tournaments: Array<TournamentListItem> = [];

  constructor() {
    this.tournaments.push({
      id: '9c6bcb8b-5a52-4595-947b-9fdf35fee691',
      date: new Date('2020-12-27'),
      state: TournamentState.INITIALIZING
    });

    this.tournaments.push({
      id: '3775c622-0f52-43b8-88d0-554b54846ac3',
      date: new Date('2019-12-27'),
      state: TournamentState.DONE
    });
  }

  addTournament(): void {
    this.tournaments.push({
      id: '8fc06802-525a-48f7-b90c-5c9f13d8d33e',
      date: new Date('2021-12-27'),
      state: TournamentState.INITIALIZING
    });
  }

  deleteTournament(id: string): void {
    const index = this.tournaments.findIndex(tournament => tournament.id === id);
    this.tournaments.splice(index, 1);
  }
}

export interface TournamentListItem {
  id: string;
  date: Date;
  state: TournamentState;
}

enum TournamentState {
  INITIALIZING = 'Initializing', IN_PROGRESS = 'In Progress', DONE = 'Done'
}

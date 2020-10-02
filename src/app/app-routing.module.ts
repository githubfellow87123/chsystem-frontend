import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TournamentListComponent} from './tournament-list/tournament-list.component';
import {PlayerListComponent} from './player-list/player-list.component';

const routes: Routes = [
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'players', component: PlayerListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

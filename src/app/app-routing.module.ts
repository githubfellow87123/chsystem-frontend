import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { HomeComponent } from './home/home.component';
import { TournamentComponent } from './tournament/tournament.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'tournaments/:id', component: TournamentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

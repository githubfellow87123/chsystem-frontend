import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerListItemComponent } from './player-list-item/player-list-item.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { TournamentListItemComponent } from './tournament-list-item/tournament-list-item.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListItemComponent,
    PlayerListComponent,
    TournamentListItemComponent,
    TournamentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  Match,
  TournamentModel,
  TournamentService,
} from '../../tournament.service';

@Component({
  selector: 'app-tournament-matches',
  templateUrl: './tournament-matches.component.html',
  styleUrls: ['./tournament-matches.component.scss'],
})
export class TournamentMatchesComponent implements OnInit, OnChanges {
  @Input()
  tournament: TournamentModel;

  matches: Match[];

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tournament != null) {
      this.tournamentService
        .getMatches(this.tournament.id)
        .subscribe((matches) => {
          this.matches = matches;
        });
    }
  }
}

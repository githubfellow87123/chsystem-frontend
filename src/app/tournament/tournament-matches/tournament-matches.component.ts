import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  Match,
  MatchResultModel,
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

  enterMatchResults(): void {
    this.matches.forEach((match) => {
      if (match.winsPlayer1 != null && match.winsPlayer2 != null) {
        this.enterMatchResult(match);
      }
    });
  }

  private enterMatchResult(match: Match): void {
    const matchResult: MatchResultModel = {
      id: match.id,
      winsPlayer1: match.winsPlayer1,
      winsPlayer2: match.winsPlayer2,
    };

    this.tournamentService
      .enterMatchResult(match.tournamentId, matchResult)
      .subscribe();
  }
}

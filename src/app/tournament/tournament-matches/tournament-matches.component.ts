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
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-tournament-matches',
  templateUrl: './tournament-matches.component.html',
  styleUrls: ['./tournament-matches.component.scss'],
})
export class TournamentMatchesComponent implements OnInit, OnChanges {
  @Input()
  tournament: TournamentModel;

  matchesCurrentRound: Match[];
  matchesPreviousRounds: Map<number, Match[]>;

  matches: Match[];

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tournament != null) {
      this.tournamentService
        .getMatches(this.tournament.id)
        .subscribe((matches) => {
          this.matches = matches;
          this.matchesCurrentRound = matches.filter(
            (match) => match.roundIndex === this.tournament.roundIndex
          );
          this.matchesPreviousRounds = this.getMatchesPreviousRounds(matches);
        });
    }
  }

  enterMatchResults(): void {
    this.matchesCurrentRound.forEach((match) => {
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

  private getMatchesPreviousRounds(allMatches: Match[]): Map<number, Match[]> {
    const matchesPreviousRoundsArray = allMatches.filter(
      (match) => match.roundIndex < this.tournament.roundIndex
    );

    const matchesPreviousRounds = new Map<number, Match[]>();

    for (let i = 1; i < this.tournament.roundIndex; i++) {
      matchesPreviousRounds.set(i, []);
    }

    matchesPreviousRoundsArray.forEach((match) => {
      const matchesOfRound = matchesPreviousRounds.get(match.roundIndex);
      matchesOfRound.push(match);
    });

    return matchesPreviousRounds;
  }

  keyDescOrder = (
    a: KeyValue<number, Match[]>,
    b: KeyValue<number, Match[]>
  ): number => {
    return a.key > b.key ? -1 : b.key > a.key ? 1 : 0;
  };
}

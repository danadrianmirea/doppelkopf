import { includes, last } from "lodash-es";

export class Scorecard {
  constructor(players) {
    this.players = players;
    this.scoreLines = [];
  }

  addScore(winningParty, points) {
    const newTotalPoints = {};
    this.players.forEach(player => {
      newTotalPoints[player.id] = includes(winningParty.players, player)
        ? this.totalPointsFor(player) + points
        : this.totalPointsFor(player) - points;
    });

    const scoreline = new Scoreline(
      newTotalPoints,
      winningParty.players,
      points
    );
    this.scoreLines.push(scoreline);
  }

  totalPointsFor(player) {
    if (!last(this.scoreLines)) {
      return 0;
    }
    return last(this.scoreLines).totalPoints[player.id];
  }
}

let lineIndex = 0;
export class Scoreline {
  constructor(totalPoints, winners, points) {
    this.id = lineIndex++;
    this.totalPoints = totalPoints;
    this.winners = winners;
    this.points = points;
  }
}

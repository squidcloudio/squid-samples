export type GameState = {
  id: string;
  cards: CardState[];
  lastAccess: number; // Allows cleanup of old games.
  blueTeam: string[];
  redTeam: string[];
  blueMaster: string | null;
  redMaster: string | null;
  turn: Team;
};

export enum Team {
  Neutral = 0,
  Red = 1,
  Blue = 2,
  Assassin = 3,
}

export type CardState = {
  word: string;
  team: Team;
  status: CardStatus;
};

export enum CardStatus {
  Idle = 0,
  TentativeBlue = 1,
  TentativeRed = 2,
  TentativeBoth = 3,
  ActuallyRed = 4,
  ActuallyBlue = 5,
  ActuallyNeutral = 6,
  ActuallyAssassin = 7,
}

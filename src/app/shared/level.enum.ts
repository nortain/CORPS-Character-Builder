export enum Level {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10

}

export function getLevelAsArray(): Array<Level> {
  return [this.One, this.Two, this.Three, this.Four, this.Five, this.Six, this.Seven, this.Eight, this.Nine, this.Ten];
}

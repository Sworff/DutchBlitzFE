export type Player = {
  id: string
  name: string
  totalScore: number
  score: {
    dutch: number
    blitz: number
    roundScore: number
  }
}

export type Round = {
  id: string
  round: number
  players: Player[]
}

export type GameState = {
  winningScore: number
  players: Player[]
  rounds: Round[]
  winners: Player[]
  isGameOver: boolean
}

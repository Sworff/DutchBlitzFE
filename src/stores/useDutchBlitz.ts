import type { GameState, Player } from '@/types/types'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export function useDutchBlitz() {
  const gameState = ref<GameState>({
    winningScore: 75,
    players: [
      {
        id: uuidv4(),
        name: 'Player 1',
        totalScore: 0,
        score: {
          dutch: 0,
          blitz: 0,
          roundScore: 0,
        },
      },
      {
        id: uuidv4(),
        name: 'Player 2',
        totalScore: 0,
        score: {
          dutch: 0,
          blitz: 0,
          roundScore: 0,
        },
      },
    ],
    rounds: [],
    winners: [],
    isGameOver: false,
  })

  const leaderBoard = computed(() => {
    return gameState.value.players.sort((a, b) => b.totalScore - a.totalScore)
  })

  const winners = computed(() => {
    const winners = leaderBoard.value.filter((p) => p.totalScore >= gameState.value.winningScore)

    if (winners.length > 0) {
      gameState.value.isGameOver = true
    }

    return winners
  })

  function addPlayer() {
    gameState.value.players.push({
      id: uuidv4(),
      name: `Player ${gameState.value.players.length + 1}`,
      totalScore: 0,
      score: {
        dutch: 0,
        blitz: 0,
        roundScore: 0,
      },
    })
  }

  function editPlayer(player: Player, newName: string) {
    gameState.value.players.filter((p) => p.id === player.id).map((p) => (p.name = newName))
  }

  function removePlayer(id: string) {
    gameState.value.players = gameState.value.players.filter((p) => id !== p.id)
  }

  function setRoundScore(roundScore: Player) {
    gameState.value.players
      .filter((p) => p.id === roundScore.id)
      .map((p) => {
        p.totalScore = roundScore.totalScore + roundScore.score.dutch - roundScore.score.blitz
        p.score.roundScore = roundScore.score.dutch - roundScore.score.blitz
      })
  }

  function startNextRound() {
    const currentPlayerScores = gameState.value.players.map((p) => ({
      ...p,
      score: { ...p.score },
    }))

    gameState.value.rounds.push({
      id: uuidv4(),
      round: gameState.value.rounds.length + 1,
      players: currentPlayerScores,
    })

    resetPlayerScores()
  }

  function deleteRound(id: string) {
    gameState.value.rounds = gameState.value.rounds.filter((r) => id !== r.id)
  }

  function resetPlayerScores() {
    gameState.value.players.forEach(
      (p) =>
        (p.score = {
          dutch: 0,
          blitz: 0,
          roundScore: 0,
        }),
    )
  }

  return {
    gameState,
    leaderBoard,
    winners,

    addPlayer,
    editPlayer,
    removePlayer,

    setRoundScore,
    startNextRound,
    deleteRound,
    resetPlayerScores,
  }
}

import type { GameState, Player, Round } from '@/types/types'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export function useDutchBlitz() {
  const players = ref<Array<Player>>([
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
  ])

  // const round = ref<Round>({
  //   id: uuidv4(),
  //   round: 1,
  //   players: players.value,
  // })

  const gameState = ref<GameState>({
    winningScore: 75,
    players: players.value,
    rounds: [],
    winners: [],
    isGameOver: false,
  })

  const leaderBoard = computed(() => {
    return players.value.sort((a, b) => b.totalScore - a.totalScore)
  })

  const winners = computed(() => {
    const winners = leaderBoard.value.filter((p) => p.totalScore >= gameState.value.winningScore)

    if (winners.length > 0) {
      gameState.value.isGameOver = true
    }

    return winners
  })

  function addPlayer() {
    players.value.push({
      id: uuidv4(),
      name: `Player ${players.value.length + 1}`,
      totalScore: 0,
      score: {
        dutch: 0,
        blitz: 0,
        roundScore: 0,
      },
    })
  }

  function editPlayer(player: Player, newName: string) {
    players.value.filter((p) => p.id === player.id).map((p) => (p.name = newName))
  }

  function removePlayer(id: string) {
    players.value = players.value.filter((p) => id !== p.id)
  }

  function setRoundScore(roundScore: Player) {
    players.value
      .filter((p) => p.id === roundScore.id)
      .map((p) => {
        p.totalScore = roundScore.totalScore + roundScore.score.dutch - roundScore.score.blitz
        p.score.roundScore = roundScore.score.dutch - roundScore.score.blitz
      })
  }

  function startNextRound(round: Round) {
    gameState.value.rounds.push(round)
  }

  function deleteRound(id: string) {
    gameState.value.rounds = gameState.value.rounds.filter((r) => id !== r.id)
  }

  function resetPlayerScore(player: Player[]) {
    player.forEach(
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
    players,
    // round,
    leaderBoard,
    winners,

    addPlayer,
    editPlayer,
    removePlayer,

    setRoundScore,
    startNextRound,
    deleteRound,
    resetPlayerScore,
  }
}

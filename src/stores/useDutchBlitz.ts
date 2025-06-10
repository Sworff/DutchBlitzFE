import type { GameState, Player } from '@/types/types'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const url = 'https://localhost:44370/DutchBlitz/api'

export function useDutchBlitz() {
  const gameState = ref<GameState>({
    id: uuidv4(),
    winningScore: 75,
    players: [],
    rounds: [],
    winners: [],
    isGameOver: false,
  })

  const leaderBoard = computed(() => {
    const leaderList = gameState.value.players.map((p) => ({ ...p }))

    return leaderList.sort((a, b) => b.totalScore - a.totalScore)
  })

  const winners = computed(() => {
    const winners = gameState.value.players.filter(
      (p) => p.totalScore >= gameState.value.winningScore,
    )

    if (winners.length > 0) {
      gameState.value.isGameOver = true
    }

    return winners
  })

  async function createGame(gameMode: string) {
    if (gameMode === 'Solo') {
      gameState.value.players = [
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
      ]
    } else {
      await axios
        .post(`${url}/createGame`)
        .then((resp) => {
          console.log(resp)
        })
        .catch((error) => console.log(error))
    }
  }

  async function addPlayer(gameMode: string) {
    if (gameMode === 'Solo') {
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
    } else {
      await axios
        .post(`${url}/addPlayer`)
        .then((resp) => {
          console.log(resp)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  async function editPlayer(gameMode: string, player: Player, newName: string) {
    if (gameMode === 'Solo') {
      gameState.value.players.filter((p) => p.id === player.id).map((p) => (p.name = newName))
    } else {
      await axios
        .patch(`${url}/editPlayer`)
        .then((resp) => {
          console.log(resp)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  async function removePlayer(gameMode: string, playerId: string) {
    if (gameMode === 'Solo') {
      gameState.value.players.filter((p) => playerId !== p.id)
    } else {
      await axios
        .delete(`${url}/removePlayer/${playerId}`)
        .then((resp) => {
          console.log(resp)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  async function setRoundScore(gameMode: string, roundScore: Player) {
    if (gameMode === 'Solo') {
      gameState.value.players
        .filter((p) => p.id === roundScore.id)
        .map((p) => {
          p.score.roundScore = roundScore.score.dutch - roundScore.score.blitz
        })
    } else {
      await axios
        .put(`${url}/setRoundScore`, { roundScore })
        .then((resp) => {
          console.log(resp)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  async function startNextRound(gameMode: string) {
    if (gameMode === 'Solo') {
      // Make deep copy of array to push into rounds
      const currentPlayerScores = gameState.value.players.map((p) => ({
        ...p,
        score: { ...p.score },
      }))

      // Update rounds array
      gameState.value.rounds.push({
        id: uuidv4(),
        round: gameState.value.rounds.length + 1,
        players: currentPlayerScores,
      })

      // Calulate Total Score
      gameState.value.players.map(
        (p) => (p.totalScore = p.totalScore + p.score.dutch - p.score.blitz),
      )
    } else {
      await axios
        .post(`${url}/startNextRound`)
        .then((resp) => {
          console.log(resp)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    resetPlayerScores(gameMode)
  }

  async function deleteRound(gameMode: string, id: string) {
    if (gameMode === 'Solo') {
      gameState.value.rounds = gameState.value.rounds.filter((r) => id !== r.id)
    } else {
      await axios
        .delete(`${url}/deleteRound`)
        .then((resp) => {
          console.log(resp)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  async function resetPlayerScores(gameMode: string) {
    if (gameMode === 'Solo') {
      gameState.value.players.forEach(
        (p) =>
          (p.score = {
            dutch: 0,
            blitz: 0,
            roundScore: 0,
          }),
      )
    } else {
      await axios
        .patch(`${url}/resetPlayerScores`)
        .then((resp) => {
          console.log(resp)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return {
    gameState,
    leaderBoard,
    winners,

    createGame,
    addPlayer,
    editPlayer,
    removePlayer,

    setRoundScore,
    startNextRound,
    deleteRound,
    resetPlayerScores,
  }
}

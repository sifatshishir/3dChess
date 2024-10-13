import { GameSituation } from './game-situation'
import { Rival } from './rival'
import { RivalStatus } from './rival-status'

export type GameStatus = {
    turn: Rival
    black: RivalStatus
    white: RivalStatus
    situation: GameSituation
}

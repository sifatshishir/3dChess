import { GameStatus } from '../types/game-status'
import { Rival } from '../types/rival'
import { pieceMovesUtils } from './pieceMovesUtils'

export const gameUtils = {
    newGame,
    checkIsChecked,
    checkCheckedIsCheckmate,
}

function newGame() {
    return {
        turn: 'white',
        black: {
            pieces: [
                {
                    type: 'pawn',
                    rank: 2,
                    file: 'A',
                    isMoved: false,
                    id: 'p101',
                },
                {
                    type: 'pawn',
                    rank: 2,
                    file: 'B',
                    isMoved: false,
                    id: 'p102',
                },
                {
                    type: 'pawn',
                    rank: 2,
                    file: 'C',
                    isMoved: false,
                    id: 'p103',
                },
                {
                    type: 'pawn',
                    rank: 2,
                    file: 'D',
                    isMoved: false,
                    id: 'p104',
                },
                {
                    type: 'pawn',
                    rank: 2,
                    file: 'E',
                    isMoved: false,
                    id: 'p105',
                },
                {
                    type: 'pawn',
                    rank: 2,
                    file: 'F',
                    isMoved: false,
                    id: 'p106',
                },
                {
                    type: 'pawn',
                    rank: 2,
                    file: 'G',
                    isMoved: false,
                    id: 'p107',
                },
                {
                    type: 'pawn',
                    rank: 2,
                    file: 'H',
                    isMoved: false,
                    id: 'p108',
                },
                {
                    type: 'rook',
                    rank: 1,
                    file: 'A',
                    isMoved: false,
                    id: 'p109',
                },
                {
                    type: 'knight',
                    rank: 1,
                    file: 'B',
                    isMoved: false,
                    id: 'p110',
                },
                {
                    type: 'bishop',
                    rank: 1,
                    file: 'C',
                    isMoved: false,
                    id: 'p111',
                },
                {
                    type: 'queen',
                    rank: 1,
                    file: 'D',
                    isMoved: false,
                    id: 'p112',
                },
                {
                    type: 'king',
                    rank: 1,
                    file: 'E',
                    isMoved: false,
                    id: 'p113',
                },
                {
                    type: 'bishop',
                    rank: 1,
                    file: 'F',
                    isMoved: false,
                    id: 'p114',
                },
                {
                    type: 'knight',
                    rank: 1,
                    file: 'G',
                    isMoved: false,
                    id: 'p115',
                },
                {
                    type: 'rook',
                    rank: 1,
                    file: 'H',
                    isMoved: false,
                    id: 'p116',
                },
            ],
        },
        white: {
            pieces: [
                {
                    type: 'pawn',
                    rank: 7,
                    file: 'A',
                    isMoved: false,
                    id: 'p117',
                },
                {
                    type: 'pawn',
                    rank: 7,
                    file: 'B',
                    isMoved: false,
                    id: 'p118',
                },
                {
                    type: 'pawn',
                    rank: 7,
                    file: 'C',
                    isMoved: false,
                    id: 'p119',
                },
                {
                    type: 'pawn',
                    rank: 7,
                    file: 'D',
                    isMoved: false,
                    id: 'p120',
                },
                {
                    type: 'pawn',
                    rank: 7,
                    file: 'E',
                    isMoved: false,
                    id: 'p121',
                },
                {
                    type: 'pawn',
                    rank: 7,
                    file: 'F',
                    isMoved: false,
                    id: 'p122',
                },
                {
                    type: 'pawn',
                    rank: 7,
                    file: 'G',
                    isMoved: false,
                    id: 'p123',
                },
                {
                    type: 'pawn',
                    rank: 7,
                    file: 'H',
                    isMoved: false,
                    id: 'p124',
                },
                {
                    type: 'rook',
                    rank: 8,
                    file: 'A',
                    isMoved: false,
                    id: 'p125',
                },
                {
                    type: 'knight',
                    rank: 8,
                    file: 'B',
                    isMoved: false,
                    id: 'p126',
                },
                {
                    type: 'bishop',
                    rank: 8,
                    file: 'C',
                    isMoved: false,
                    id: 'p127',
                },
                {
                    type: 'queen',
                    rank: 8,
                    file: 'D',
                    isMoved: false,
                    id: 'p128',
                },
                {
                    type: 'king',
                    rank: 8,
                    file: 'E',
                    isMoved: false,
                    id: 'p129',
                },
                {
                    type: 'bishop',
                    rank: 8,
                    file: 'F',
                    isMoved: false,
                    id: 'p130',
                },
                {
                    type: 'knight',
                    rank: 8,
                    file: 'G',
                    isMoved: false,
                    id: 'p131',
                },
                {
                    type: 'rook',
                    rank: 8,
                    file: 'H',
                    isMoved: false,
                    id: 'p132',
                },
            ],
        },
        situation: 'inactive',
    } as GameStatus
}

function checkIsChecked(gameStatus: GameStatus, rival: Rival): boolean {
    const secondRival = rival === 'white' ? 'black' : 'white'
    const king = gameStatus[rival].pieces.find((piece) => piece.type === 'king')
    if (!king) return false
    const kingPosition = {
        file: king.file,
        rank: king.rank,
    }

    return gameStatus[secondRival].pieces.some((piece) => {
        const pieceData = {
            ...piece,
            rival: secondRival as Rival,
        }
        const pieceMoves = pieceMovesUtils.getPieceMovesWithUnValid(
            pieceData,
            gameStatus
        )
        return pieceMoves.captures.some(
            (move) =>
                move.file === kingPosition.file &&
                move.rank === kingPosition.rank
        )
    })
}

function checkCheckedIsCheckmate(
    gameStatus: GameStatus,
    rival: Rival
): boolean {
    return gameStatus[rival].pieces.every((piece) => {
        const pieceData = {
            ...piece,
            rival: rival as Rival,
        }
        const pieceMoves = pieceMovesUtils.getPieceMoves(pieceData, gameStatus)
        return !pieceMoves.available.length && !pieceMoves.captures.length
    })
}

import { usePiecePosition } from '@/app/hooks/usePiecePosition'
import { ChessFile } from '@/app/types/chess-file'
import { ChessRank } from '@/app/types/chess-rank'
import { Piece as TPiece } from '@/app/types/piece'
import { useMemo, useRef, useEffect } from 'react'
import { pieceUtils } from '../../utils/pieceUtils'
import { Rival } from '@/app/types/rival'
import { PieceModelProps } from '@/app/types/piece-model-props'
import { King } from './pieces/King'
import { Queen } from './pieces/Queen'
import { Bishop } from './pieces/Bishop'
import { Knight } from './pieces/Knight'
import { Rook } from './pieces/Rook'
import { Pawn } from './pieces/Pawn'
import * as THREE from 'three'
import { PieceStatus } from '@/app/types/piece-status'
import { PieceData } from '@/app/types/piece-data'
import { on } from 'events'
import { useAddToY } from '@/app/hooks/useAddToY'

export type PieceProps = {
    onPieceClick: (piece: PieceData) => void
    isSelected: boolean
} & PieceData

export function Piece({
                          rank,
                          file,
                          type: piece,
                          rival,
                          isMoved,
                          id,
                          isSelected,
                          onPieceClick,
                      }: PieceProps) {
    const chessPosition = useMemo(() => ({ rank, file }), [rank, file])
    const { x, z } = usePiecePosition(chessPosition, true)
    const addToY = useAddToY(isSelected)
    const ref = useRef<THREE.Group>(null) // Reference for the main piece

    const props = useMemo(() => {
        const { positionY, scale } = pieceUtils.getPieceStats(piece)
        const color = rival === 'black' ? '#000000' : '#ffffff'
        return {
            'position-x': x,
            'position-y': positionY + addToY,
            'position-z': z,
            'rotation-y': rival === 'black' ? Math.PI : 0,
            scale,
            material: new THREE.MeshPhysicalMaterial({
                color: color,
                transparent: false,
                opacity: 1.0,
                roughness: 0.1,
                metalness: 0.0,
            }),
            onClick: () => {
                onPieceClick({ rank, file, type: piece, rival, isMoved, id })
            },
        }
    }, [piece, x, z, rival, rank, file, isMoved, onPieceClick, id, addToY])

    useEffect(() => {
        if (!ref.current) return;

        // Create the outline when the piece is added
        const pieceMesh = ref.current.children[0] as THREE.Mesh;
        if (pieceMesh && pieceMesh.geometry) {
            const outlineMaterial = new THREE.LineBasicMaterial({ color: '#000000', linewidth: 2 });
            const edges = new THREE.EdgesGeometry(pieceMesh.geometry);
            const outline = new THREE.LineSegments(edges, outlineMaterial);

            // Add the outline to the piece
            ref.current.add(outline);
        }
    }, [ref]);

    return (
        <group ref={ref}>
            {/* Main Piece Mesh */}
            {(() => {
                let pieceMesh;
                switch (piece) {
                    case 'king':
                        pieceMesh = <King {...props} />
                        break;
                    case 'queen':
                        pieceMesh = <Queen {...props} />
                        break;
                    case 'bishop':
                        pieceMesh = <Bishop {...props} />
                        break;
                    case 'knight':
                        pieceMesh = <Knight {...props} />
                        break;
                    case 'rook':
                        pieceMesh = <Rook {...props} />
                        break;
                    case 'pawn':
                        pieceMesh = <Pawn {...props} />
                        break;
                    default:
                        return null;
                }

                return pieceMesh;
            })()}
        </group>
    )
}

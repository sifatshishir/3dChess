'use client';

import { Canvas } from '@react-three/fiber';
import { XR, ARButton } from '@react-three/xr';
import './styles/global.scss';
import { Experience } from './experience/Experience';
import { useGame } from './hooks/useGame';
import { Controls } from './controls/Controls';
import { useMemo } from 'react';

export default function Home() {
    const [game, gameActions] = useGame();

    const isGameStart = useMemo(() => {
        return game.situation !== 'inactive' && game.situation !== 'checkmate';
    }, [game.situation]);

    return (
        <div className={`home ${isGameStart ? 'start' : ''}`}>
            <Controls game={game} gameActions={gameActions} />
            <Canvas>
                {/*<XR>*/}
                    <Experience game={game} gameActions={gameActions} />
                {/*</XR>*/}
            </Canvas>
            {/*<ARButton /> /!* AR Button for activating AR mode *!/*/}
        </div>
    );
}

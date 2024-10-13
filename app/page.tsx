'use client';

import { Canvas } from '@react-three/fiber';
import { XR, ARButton } from '@react-three/xr';
import './styles/global.scss';
import { Experience } from './experience/Experience';
import { useGame } from './hooks/useGame';
import { Controls } from './controls/Controls';
import { useMemo } from 'react';
import {Analytics} from '@vercel/analytics/react';

export default function Home() {
    const [game, gameActions] = useGame();

    const isGameStart = useMemo(() => {
        return game.situation !== 'inactive' && game.situation !== 'checkmate';
    }, [game.situation]);

    return (
        <div className={`home ${isGameStart ? 'start' : ''}`}>
            <Controls game={game} gameActions={gameActions} />
            <Canvas>
                <perspectiveCamera
                    position={[0, 3, 5]} // Initial camera position
                    fov={75} // Field of view
                    near={0.1} // Near clipping plane
                    far={1000} // Far clipping plane
                />
                {/*<XR>*/}
                    <Experience game={game} gameActions={gameActions} />
                {/*</XR>*/}
            </Canvas>
            <Analytics/>
            {/*<ARButton /> /!* AR Button for activating AR mode *!/*/}
        </div>
    );
}

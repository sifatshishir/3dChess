import { useMemo } from 'react';
import { GameActions } from '../hooks/useGame';
import { GameStatus } from '../types/game-status';
import { Data } from './components/Data';
import { Options } from './components/Options';
import { StartMenu } from './components/StartMenu';
import { EndMenu } from './components/EndMenu';

type ControlsProps = {
    game: GameStatus;
    gameActions: GameActions;
};

export function Controls({ game, gameActions }: ControlsProps) {
    const isGameStart = useMemo(() => game.situation !== 'inactive', [game.situation]);
    const isCheckmate = useMemo(() => game.situation === 'checkmate', [game.situation]);

    return (
        <div className="controls">
            {isGameStart && !isCheckmate && (
                <>
                    <Data game={game} />
                    <Options gameActions={gameActions} />
                </>
            )}
            {!isGameStart && !isCheckmate && <StartMenu gameActions={gameActions} />}
            {isCheckmate && <EndMenu gameActions={gameActions} />}
        </div>
    );
}

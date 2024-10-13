import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useState } from 'react';
import { Rival } from '../types/rival';
import { GameStatus } from '../types/game-status';

type Position = {
    x: number;
    y: number;
    z: number;
};

type CameraPosition = {
    white: Position;
    black: Position;
};

const _option = {
    duration: 300,
    coilRatio: 0.1,
};

export function useCameraPosition(status: GameStatus, controlsRef: React.RefObject<any>) {
    const { camera } = useThree();
    const [targetPosition, setTargetPosition] = useState<Position | null>(null);
    const [cameraPosition, setCameraPosition] = useState<CameraPosition>({
        white: { x: 8, y: 4, z: 3 },
        black: { x: -8, y: 4, z: -3 },
    });
    const [zoomLevel, setZoomLevel] = useState<number>(1);

    const updateCameraState = useCallback(() => {
        if (controlsRef.current) {
            const controlsObject = controlsRef.current; // Get the controls reference

            // Access the camera from the OrbitControls object
            const { position, rotation } = controlsObject.object;

            camera.position.copy(position);
            camera.rotation.copy(rotation);
            setZoomLevel(controlsObject.object.zoom); // Use zoom from controls
        }
    }, [camera, controlsRef]);

    useEffect(() => {
        if (controlsRef) {
            const controls = controlsRef.current;
            if (controls) {
                controls.addEventListener('change', updateCameraState);
            }
            return () => {
                if (controls) {
                    controls.removeEventListener('change', updateCameraState);
                }
            };
        }
    }, [updateCameraState, controlsRef]);

    const coilPosition = useCallback((position: Position, target: Position) => {
        const resultX = Math.abs(position.x - target.x);
        const resultY = Math.abs(position.y - target.y);
        const resultZ = Math.abs(position.z - target.z);
        if (
            resultX < _option.coilRatio &&
            resultY < _option.coilRatio &&
            resultZ < _option.coilRatio
        ) {
            return target;
        }
        return position;
    }, []);

    const changeCameraPosition = useCallback((delta: number, current: Position, target: Position) => {
        const stepRatio = delta * (_option.duration / 1000) * 25;
        const direction = {
            x: target.x - current.x,
            y: target.y - current.y,
            z: target.z - current.z,
        };
        const distance = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);

        if (distance < 0.01) {
            return target;
        }

        const normalizedDirection = {
            x: direction.x / distance,
            y: direction.y / distance,
            z: direction.z / distance,
        };

        const newPosition = {
            x: current.x + normalizedDirection.x * stepRatio,
            y: current.y + normalizedDirection.y * stepRatio,
            z: current.z + normalizedDirection.z * stepRatio,
        };

        return coilPosition(newPosition, target);
    }, [coilPosition]);

    const getTargetPosition = useCallback((rival: Rival) => {
        return cameraPosition[rival];
    }, [cameraPosition]);

    const onTurnChange = useCallback((rival: Rival) => {
        const target = getTargetPosition(rival);
        setTargetPosition(target);
        if (controlsRef?.current) {
            controlsRef.current.object.zoom = zoomLevel; // Set zoom level directly
            controlsRef.current.update(); // Call update directly on controls
        }
    }, [getTargetPosition, zoomLevel, controlsRef]);

    useEffect(() => {
        if (status.turn === 'white' && status.white.pieces.every(piece => !piece.isMoved)) {
            camera.position.set(cameraPosition.white.x, cameraPosition.white.y, cameraPosition.white.z);
            setZoomLevel(1);
            if (controlsRef?.current) {
                controlsRef.current.object.zoom = 1; // Set default zoom for white
                controlsRef.current.update(); // Update controls directly
            }
            return;
        }
        onTurnChange(status.turn);
    }, [status, onTurnChange, cameraPosition, controlsRef]);

    useFrame((_, delta) => {
        if (targetPosition) {
            const current = camera.position;
            const newPosition = changeCameraPosition(delta, current, targetPosition);
            camera.position.set(newPosition.x, newPosition.y, newPosition.z);

            if (newPosition.x === targetPosition.x && newPosition.y === targetPosition.y && newPosition.z === targetPosition.z) {
                setTargetPosition(null);
            }
        }
    });

    const setCameraZoom = (zoom: number) => {
        setZoomLevel(zoom);
        if (controlsRef.current) {
            controlsRef.current.object.zoom = zoom; // Set zoom level in OrbitControls
            controlsRef.current.update(); // Update controls
        }
    };

    return { setCameraZoom };
}

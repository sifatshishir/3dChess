export function Lights() {
    return (
        <>
            <ambientLight intensity={0.4} />  {/* Soft overall illumination */}
            <directionalLight position={[4, 4, 4]} intensity={1} />  {/* Main light source */}
            <directionalLight position={[-4, 4, -4]} intensity={0.5} />  {/* Fill light for balance */}
            <pointLight position={[0, 10, 0]} intensity={1} decay={2} distance={100} />  {/* Top-down light for more highlight */}
        </>
    );
}

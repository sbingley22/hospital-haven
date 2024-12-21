
const FakeShadow = ({ size=0.3, strength=0.3 }) => {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]}>
      <circleGeometry args={[size, 12]} />
      <meshBasicMaterial color="black" transparent opacity={strength} />
    </mesh>
  )
}

export default FakeShadow

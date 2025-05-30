interface SimpleMapProps {
  type: "roadmap" | "satellite"
  cityName: string
  userLocation?: { lat: number; lng: number } | null
}

export function SimpleMap({ type, cityName, userLocation }: SimpleMapProps) {
  // Generate a grid pattern for the map
  const gridSize = 20
  const gridColor = type === "roadmap" ? "#e0e0e0" : "#ffffff33"

  // Generate some random "roads" or "landmarks" for the map
  const roads = []
  const landmarks = []

  // Seed based on city name to get consistent "random" patterns for each city
  const seed = cityName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Generate horizontal roads
  for (let i = 0; i < 5; i++) {
    const y = 100 + ((seed + i * 37) % 400)
    roads.push(<line key={`h-${i}`} x1="0" y1={y} x2="800" y2={y} stroke="#aaa" strokeWidth="3" />)
  }

  // Generate vertical roads
  for (let i = 0; i < 5; i++) {
    const x = 100 + ((seed + i * 43) % 600)
    roads.push(<line key={`v-${i}`} x1={x} y1="0" x2={x} y2="600" stroke="#aaa" strokeWidth="3" />)
  }

  // Generate landmarks
  for (let i = 0; i < 8; i++) {
    const x = 50 + ((seed + i * 61) % 700)
    const y = 50 + ((seed + i * 73) % 500)
    const size = 10 + ((seed + i) % 15)

    landmarks.push(
      <rect key={`l-${i}`} x={x} y={y} width={size} height={size} fill={type === "roadmap" ? "#888" : "#aaa"} />,
    )
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        style={{
          background: type === "roadmap" ? "#f8f8f8" : "#333",
        }}
      >
        {/* Grid pattern */}
        <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke={gridColor} strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Roads and landmarks */}
        {type === "roadmap" && roads}
        {landmarks}

        {/* City center marker */}
        <circle cx="400" cy="300" r="8" fill="#4CAF50" stroke="#fff" strokeWidth="2" />
        <text x="400" y="330" textAnchor="middle" fill={type === "roadmap" ? "#333" : "#fff"} fontSize="14">
          {cityName}
        </text>

        {/* User location if available */}
        {userLocation && (
          <>
            <circle cx="400" cy="300" r="30" fill="rgba(33, 150, 243, 0.1)" />
            <circle cx="400" cy="300" r="20" fill="rgba(33, 150, 243, 0.2)" />
            <circle cx="400" cy="300" r="10" fill="rgba(33, 150, 243, 0.3)" />
            <circle cx="400" cy="300" r="6" fill="#2196F3" stroke="#fff" strokeWidth="2">
              <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
    </div>
  )
}

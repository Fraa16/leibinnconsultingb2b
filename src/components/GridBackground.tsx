type GridBackgroundProps = {
  gridSize?: number;
  gridOpacity?: number;
  glowIntensity?: number;
  glowSpread?: number;
  fadeTopBottom?: boolean;
  className?: string;
};

export default function GridBackground({
  gridSize = 32,
  gridOpacity = 0.15,
  glowIntensity = 0.22,
  glowSpread = 75,
  fadeTopBottom = true,
  className = '',
}: GridBackgroundProps) {
  const gridStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,${gridOpacity}) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,${gridOpacity * 0.75}) 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize}px ${gridSize}px`,
  };

  return (
    <div
      className={`
        absolute inset-0 pointer-events-none
        ${className}
      `}
      style={{
        background: `radial-gradient(circle at 50% 55%, rgba(42,45,124,${glowIntensity}) 0%, rgba(42,45,124,${glowIntensity * 0.27}) 40%, rgba(42,45,124,0) ${glowSpread}%)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={gridStyle}
      />
      {fadeTopBottom && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(247,247,247,1) 0, rgba(247,247,247,0) 18%, rgba(247,247,247,0) 82%, rgba(247,247,247,1) 100%)',
          }}
        />
      )}
    </div>
  );
}

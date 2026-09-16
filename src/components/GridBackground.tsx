type GridBackgroundProps = {
  gridSize?: number;
  gridOpacity?: number;
  glowIntensity?: number;
  glowSpread?: number;
  /** Colour the top/bottom fade blends into — should match the section tone. */
  fadeColor?: string;
  fadeTopBottom?: boolean;
  className?: string;
};

/**
 * Faint grid with a cobalt glow, used behind the light sections.
 * The fade colour is a prop now; it used to be hardcoded to rgba(247,247,247)
 * and only lined up against one specific background.
 */
export default function GridBackground({
  gridSize = 32,
  gridOpacity = 0.15,
  glowIntensity = 0.22,
  glowSpread = 75,
  fadeColor = '249, 249, 249',
  fadeTopBottom = true,
  className = '',
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 55%, rgba(42,45,124,${glowIntensity}) 0%, rgba(42,45,124,${
          glowIntensity * 0.27
        }) 40%, rgba(42,45,124,0) ${glowSpread}%)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(21,23,79,${gridOpacity}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(21,23,79,${gridOpacity * 0.75}) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
      {fadeTopBottom && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(${fadeColor},1) 0, rgba(${fadeColor},0) 18%, rgba(${fadeColor},0) 82%, rgba(${fadeColor},1) 100%)`,
          }}
        />
      )}
    </div>
  );
}

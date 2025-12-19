interface SpotlightProps {
  children: React.ReactNode;
  position?: { top: number; left: number; width: number; height: number };
}

export default function Spotlight({ children, position }: SpotlightProps) {
  if (!position) return null;

  return (
    <>
      {/* Dark overlay with cutout */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect
                x={position.left - 8}
                y={position.top - 8}
                width={position.width + 16}
                height={position.height + 16}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.75)"
            mask="url(#spotlight-mask)"
          />
        </svg>

        {/* Animated spotlight ring */}
        <div
          className="absolute rounded-xl border-4 border-blue-500 animate-pulse"
          style={{
            top: position.top - 8,
            left: position.left - 8,
            width: position.width + 16,
            height: position.height + 16,
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3)',
          }}
        />
      </div>

      {/* Tooltip content */}
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
        <div className="pointer-events-auto max-w-md">{children}</div>
      </div>
    </>
  );
}


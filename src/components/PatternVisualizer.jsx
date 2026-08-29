import React from 'react';
import { Triangle, Circle, Square, Star, ArrowUp, Hexagon } from 'lucide-react';

const SHAPE_ICONS = {
  triangle: Triangle,
  circle: Circle,
  square: Square,
  star: Star,
  pentagon: Hexagon,
};

function isHexColor(value) {
  return typeof value === 'string' && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
}

// Renders a single item (from a sequence or as an option) based on the puzzle's data.type
function PatternItem({ item, dataType }) {
  // Shape with a size (shape_size)
  if (item && typeof item === 'object' && 'name' in item && 'size' in item) {
    const Icon = SHAPE_ICONS[item.name] || Square;
    const px = Math.min(16 + Number(item.size || 1) * 6, 64);
    return (
      <div className="flex flex-col items-center gap-1">
        <Icon size={px} className="text-accent" />
        <span className="text-xs text-secondary">{item.size}</span>
      </div>
    );
  }

  // Color swatch (color_cycle)
  if (isHexColor(item)) {
    return (
      <div
        className="w-10 h-10 rounded-md border border-border"
        style={{ backgroundColor: item }}
      />
    );
  }

  // Rotation angle (rotation)
  if (dataType === 'rotation' && typeof item === 'number') {
    return (
      <div className="flex flex-col items-center gap-1">
        <ArrowUp
          size={28}
          className="text-accent transition-transform"
          style={{ transform: `rotate(${item}deg)` }}
        />
        <span className="text-xs text-secondary">{item}°</span>
      </div>
    );
  }

  // Shape name only (shape_sequence)
  if (typeof item === 'string' && SHAPE_ICONS[item]) {
    const Icon = SHAPE_ICONS[item];
    return <Icon size={28} className="text-accent" />;
  }

  // Fallback: plain text/number (sequences, grids, directions, colors-as-words, etc.)
  return (
    <span className="text-lg font-mono font-bold text-primary">
      {typeof item === 'object' ? JSON.stringify(item) : String(item)}
    </span>
  );
}

export default function PatternVisualizer({ data }) {
  if (!data) return null;

  const dataType = data.type;
  const sequenceItems =
    data.shapes || data.sequence || (data.grid ? data.grid.flat() : null) || (data.levels ? data.levels.map(l => l.length) : null);

  return (
    <div className="space-y-6">
      {sequenceItems && (
        <div className="flex flex-wrap items-center justify-center gap-4 py-4">
          {sequenceItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-surface border border-border rounded-lg p-3 min-w-[56px] min-h-[56px] flex items-center justify-center">
                {item === '?' ? (
                  <span className="text-2xl font-bold text-accent">?</span>
                ) : (
                  <PatternItem item={item} dataType={dataType} />
                )}
              </div>
              {idx < sequenceItems.length - 1 && (
                <span className="text-secondary">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {data.options && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.options.map((option, idx) => (
            <div
              key={idx}
              className="bg-elevated border border-border rounded-lg p-4 flex items-center justify-center"
            >
              <PatternItem item={option} dataType={dataType} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

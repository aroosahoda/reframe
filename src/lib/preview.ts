export type PreviewRotation = 0 | 90 | 180 | 270;

export function getPreviewRotationStyle(rotation: PreviewRotation) {
  if (rotation === 0) {
    return {
      transform: 'none',
      transformOrigin: 'center' as const,
    };
  }

  return {
    transform: `rotate(${rotation}deg)`,
    transformOrigin: 'center' as const,
  };
}

export function shouldAllowPreviewOverflow(rotation: PreviewRotation) {
  return rotation === 90 || rotation === 270;
}

export function clampPreviewTime(
  trimStart: number,
  trimEnd: number | null,
  duration: number,
) {
  if (!Number.isFinite(duration) || duration <= 0) {
    return 0;
  }

  const boundedTrimStart = Math.max(0, Math.min(trimStart, duration));

  if (trimEnd === null) {
    return boundedTrimStart;
  }

  return Math.max(0, Math.min(boundedTrimStart, trimEnd));
}

import { describe, expect, it } from 'vitest';
import { clampPreviewTime, getPreviewRotationStyle, shouldAllowPreviewOverflow } from './preview';

describe('preview helpers', () => {
  it('returns a rotation style for rotated previews', () => {
    expect(getPreviewRotationStyle(90)).toEqual({
      transform: 'rotate(90deg)',
      transformOrigin: 'center',
    });
  });

  it('returns no rotation transform for 0 degrees', () => {
    expect(getPreviewRotationStyle(0)).toEqual({
      transform: 'none',
      transformOrigin: 'center',
    });
  });

  it('allows overflow for 90 and 270 degree rotations', () => {
    expect(shouldAllowPreviewOverflow(90)).toBe(true);
    expect(shouldAllowPreviewOverflow(270)).toBe(true);
    expect(shouldAllowPreviewOverflow(0)).toBe(false);
  });

  it('clamps preview time to the trim start when valid', () => {
    expect(clampPreviewTime(2, 10, 30)).toBe(2);
  });

  it('falls back to zero when duration is unavailable', () => {
    expect(clampPreviewTime(2, 10, 0)).toBe(0);
  });
});

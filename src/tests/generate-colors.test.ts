import { describe, expect } from 'vitest';
import { getRandomColorRGB } from '../units/generate-colors.ts';

const allowedColors = [
  'rgb(243, 141, 223)',
  'rgba(0, 205, 185)',
  'rgba(170, 148, 221)',
  'rgba(255,115,92)',
  'rgba(0, 172, 248)',
];

describe('generate-colors', () => {
  it('return a valid color from the list', () => {
    const color = getRandomColorRGB();
    expect(allowedColors).toContain(color);
  });
});

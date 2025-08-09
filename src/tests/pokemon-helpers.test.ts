import { describe, expect } from 'vitest';
import { getPokemonImageUrl } from '../units/pokemon-helpers.ts';

describe('pokemon-helpers', () => {
  it('return correct Url', () => {
    expect(getPokemonImageUrl(1)).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`
    );
    expect(getPokemonImageUrl(33)).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png`
    );
  });
});

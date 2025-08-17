import type { CardProps } from '@/types/components.ts';

const formatCharactersToCSV = (cards: CardProps[]): string => {
  if (!cards.length) return '';
  const titles: string = Object.keys(cards[0]).join(';');
  const rows = cards.map((char) => Object.values(char).join(';'));

  return '\uFEFF' + [titles, ...rows].join('\n');
};

export default formatCharactersToCSV;

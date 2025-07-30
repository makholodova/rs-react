import type { CardProps } from 'types/components.ts';

const formatCharactersToCSV = (cards: CardProps[]): string[] => {
  const blobParts: string[] = [];

  const titles: string = Object.keys(cards[0]).join(';');
  blobParts.push(`${titles}\n`);

  const rows = cards.map((char) => Object.values(char).join(';'));
  rows.forEach((row) => blobParts.push(`${row}\n`));

  return blobParts;
};

export default formatCharactersToCSV;

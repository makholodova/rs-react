import { CardProps } from '@/types/components.ts';
import formatCharactersToCSV from '@/units/formatCharactersToCSV';

export async function POST(req: Request) {
  const form = await req.formData();
  const itemsRaw = form.get('items');

  if (typeof itemsRaw !== 'string') {
    return new Response('Bad Request: items not provided', { status: 400 });
  }

  let items: CardProps[];
  try {
    items = JSON.parse(itemsRaw);
    if (!Array.isArray(items)) throw new Error();
  } catch {
    return new Response('Bad Request: items must be JSON array', {
      status: 400,
    });
  }

  const csv = formatCharactersToCSV(items);
  const filename = `${items.length}_items.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

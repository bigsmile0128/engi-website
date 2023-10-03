import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://api.coinbase.com/v2/exchange-rates?currency=ETH',
    {
      next: {
        // 1-hour TTL
        revalidate: 3600,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return NextResponse.json({ data });
}

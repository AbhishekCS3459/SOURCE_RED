// src/app/api/repos/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch(
    'https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc',
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    },
  );

  const data = await response.json();
  return NextResponse.json(data);
}

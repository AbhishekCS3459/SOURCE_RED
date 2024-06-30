// src/app/api/sponsors/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

export async function GET() {
  try {
    // Example URL: replace with a real URL or method to fetch sponsor data
    const response = await axios.get('https://github.com/sponsors');
    const html = response.data;
    const $ = cheerio.load(html);

    // Example scraping logic: adjust according to the real structure
    const sponsors: {
      name: string;
      link: string | undefined;
      avatar: string | undefined;
      amount: string;
    }[] = [];
    $('.sponsor-profile').each((index, element) => {
      const sponsor = {
        name: $(element).find('.sponsor-name').text(),
        link: $(element).find('.sponsor-link').attr('href'),
        avatar: $(element).find('.sponsor-avatar img').attr('src'),
        amount: $(element).find('.sponsor-amount').text(),
      };
      sponsors.push(sponsor);
    });

    return NextResponse.json({ sponsors });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sponsor data' });
  }
}

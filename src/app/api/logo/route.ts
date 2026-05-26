import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  const filePath = 'C:\\Users\\TUF\\.gemini\\antigravity\\brain\\69bf0003-d076-4e5a-b0d5-7d8566118358\\media__1778343702731.png';
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving logo image:', error);
    return new NextResponse('Error loading image', { status: 500 });
  }
}

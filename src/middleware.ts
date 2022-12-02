import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { IMAGES } from '@/lib/types';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/carriers')) {
    const unknown = IMAGES.filter(k => request.url.includes(k)).length === 0;
    if (unknown) {
      const name = request.url.split('/carriers/').pop();
      return NextResponse.rewrite(new URL(`/api/images/${name}`, request.url));
    }
  }
}


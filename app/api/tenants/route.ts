// Optional: Next.js API route to proxy tenant creation requests
// This is a best practice to avoid exposing your backend API directly

import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API = 'http://178.156.219.218/v1/tenants';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.name || typeof body.floor !== 'number' || typeof body.month !== 'number' || typeof body.year !== 'number') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Forward request to external API
    const upstream = await fetch(EXTERNAL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // if (!response.ok) {
    //   const error = await response.json().catch(() => ({}));
    //   return NextResponse.json(
    //     error || { error: 'Failed to create tenant' },
    //     { status: response.status }
    //   );
    // }

    // const data = await response.json();
    // return NextResponse.json(data, { status: response.status });

    const data = await upstream.json().catch(() => ({}));

    return NextResponse.json(data, { status: upstream.status });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


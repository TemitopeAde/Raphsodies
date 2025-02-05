import { NextResponse } from 'next/server';
import * as cookie from 'cookie';

export async function POST() {
  try {
    const cookies = cookie.serialize('token', '', {
      maxAge: -1, 
      path: '/', 
    });

    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    response.headers.set('Set-Cookie', cookies);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

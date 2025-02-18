import { NextResponse } from 'next/server';
import * as cookie from 'cookie';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    cookies().delete('authToken');
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

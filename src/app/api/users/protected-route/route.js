import { NextResponse } from 'next/server';
import { verifyJWTToken } from '@/utils/jwt';
import * as cookie from 'cookie';

export async function GET(request) {
  try {
    const cookies = cookie.parse(request.headers.get('Cookie') || '');
    const token = cookies.token;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyJWTToken(token);

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Protected route accessed', user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

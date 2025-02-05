import { loginUser } from '@/actions/loginUsers';
import { createJWTToken } from '@/utils/jwt';
import { NextResponse } from 'next/server';
import * as cookie from 'cookie';

export async function POST(request) {
  try {
    const parsedBody = await request.json();
    
    if (!parsedBody?.email || !parsedBody?.password) {
      return NextResponse.json(
        { message: 'Missing email or password' },
        { status: 400 }
      );
    }

    const { email, password } = parsedBody;
    const user = await loginUser(email, password);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { message: 'Please verify your email before logging in' },
        { status: 403 }
      );
    }

    const token = createJWTToken(user);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    };

    const cookies = cookie.serialize('token', token, cookieOptions);

    const response = NextResponse.json(
      { message: 'Login successful', token },
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

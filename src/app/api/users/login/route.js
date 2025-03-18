import { loginUser } from '@/actions/loginUsers';
import { createJWTToken } from '@/utils/jwt';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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

    cookies().set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 604800,
      path: '/',
    });

    // const cookieOptions = {
    //   httpOnly: false,
    //   secure: true,
    //   sameSite: "None",
    //   signed: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 7
    // };

    // const cookies = cookie.serialize('token', token, cookieOptions);

    const response = NextResponse.json(
      { message: 'Login successful'},
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

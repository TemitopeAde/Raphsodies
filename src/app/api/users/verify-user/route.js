import { NextResponse } from 'next/server';
import { verifyUserEmail } from '@/actions/verify-email';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    console.log({token});
  
    if (!token) {
      return NextResponse.json({ message: 'Invalid or missing token' }, { status: 400 });
    }

    const result = await verifyUserEmail(token);

    return NextResponse.json({ message: result.message }, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error('Error handling verification request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

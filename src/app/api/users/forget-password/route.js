import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/actions/getUser';
import { sendPasswordResetEmail } from '@/utils/email';
import { createPasswordResetToken } from '@/utils/jwt';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ message: 'Missing email in request body' }, { status: 400 });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const resetToken = createPasswordResetToken(user);
    const resetLink = `${process.env.ORIGIN}/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail(user.email, resetLink);

    return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

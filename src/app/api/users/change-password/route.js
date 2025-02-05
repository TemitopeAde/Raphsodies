import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/actions/getUser';
import { updateUserPassword } from '@/actions/updateUserPassword';
import { verifyPasswordResetToken } from '@/utils/jwt';

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json({ message: 'Token and new password are required' }, { status: 400 });
    }

    const decoded = verifyPasswordResetToken(token);

    if (!decoded) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    const user = await getUserByEmail(decoded.email);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updatedUser = await updateUserPassword(user.id, newPassword);

    if (!updatedUser) {
      return NextResponse.json({ message: 'Failed to update password' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

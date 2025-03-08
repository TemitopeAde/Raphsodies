// pages/api/test-email.js
import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utils/sendVerification';

export async function GET() {
  try {
    await sendVerificationEmail('adesiyantope2014@gmail.com', 'test-token-123');
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
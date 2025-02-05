import { NextResponse } from 'next/server';
import { createUser } from '@/actions/createUser';
import bcryptjs from 'bcryptjs';

export async function POST(request) {
  try {
    const parsedBody = await request.json();

    if (!parsedBody || !parsedBody.email || !parsedBody.name || !parsedBody.password) {
      return NextResponse.json({ message: 'Missing email, name, or password' }, { status: 400 });
    }

    const { email, name, password } = parsedBody;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await createUser(email, name, hashedPassword);

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: 'Invalid JSON format' }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

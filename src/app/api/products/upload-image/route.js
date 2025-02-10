import { NextResponse } from 'next/server';
import { uploadImageToCloudinary } from '@/actions/upload-image';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function OPTIONS(request) {
  return NextResponse.json({}, { status: 200 })
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageUrl = await uploadImageToCloudinary(buffer);

    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server errzor', error: error.message }, { status: 500 });
  }
}
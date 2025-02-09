import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
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
    const tmpDir = path.join(process.cwd(), 'app', 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    const tmpPath = path.join(tmpDir, `${Date.now()}_${file.name}`);
    fs.writeFileSync(tmpPath, buffer);
    const imageUrl = await uploadImageToCloudinary(tmpPath);
    fs.unlinkSync(tmpPath);
    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

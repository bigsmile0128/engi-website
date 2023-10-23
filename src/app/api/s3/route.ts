import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getPresignedUrl, getWalletId } from '~/app/(user)/api';

export async function PUT(request: NextRequest) {
  let file: File;

  try {
    const formData = await request.formData();
    file = formData.get('file') as File;
    if (!file) {
      throw new Error();
    }
  } catch (err) {
    return NextResponse.json(
      { message: '"file" is required.' },
      { status: 400 }
    );
  }

  let presignedUrl: string;

  // check if user is logged in
  try {
    await getWalletId();
  } catch (err) {
    return NextResponse.json(
      { message: 'User must be logged in.' },
      { status: 403 }
    );
  }

  try {
    presignedUrl = await getPresignedUrl(file.type);
  } catch (err) {
    return NextResponse.json(
      {
        message: `Failed to upload image. ${file.type} is not supported.`,
      },
      { status: 500 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const url = new URL(presignedUrl);
    await axios.put(presignedUrl, buffer, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return NextResponse.json({
      // image URL is presigned URL without the query params
      url: `${url.origin}${url.pathname}`,
    });
  } catch (err) {
    return NextResponse.json({ message: err.toString() }, { status: 500 });
  }
}

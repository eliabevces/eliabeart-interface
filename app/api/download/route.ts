import { NextRequest, NextResponse } from 'next/server';

const FILE_EXTENSION_REGEX = /\.[a-zA-Z0-9]+$/;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const albumId = searchParams.get('album_id');
  const imageName = searchParams.get('image_name');

  if (!albumId || !imageName) {
    return NextResponse.json(
      { error: 'Missing album_id or image_name' },
      { status: 400 }
    );
  }

  try {
    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/images/${albumId}/${imageName}`;
    
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const blob = await response.blob();
    
    // Get the content type from the original response
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // Ensure the filename has an extension
    let fileName = imageName;
    if (!FILE_EXTENSION_REGEX.test(fileName)) {
      // Add extension based on content type or default to .jpg
      if (contentType.includes('png')) {
        fileName = `${fileName}.png`;
      } else if (contentType.includes('gif')) {
        fileName = `${fileName}.gif`;
      } else if (contentType.includes('webp')) {
        fileName = `${fileName}.webp`;
      } else {
        fileName = `${fileName}.jpg`;
      }
    }
    
    // Create a response with the image data
    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to download image' },
      { status: 500 }
    );
  }
}

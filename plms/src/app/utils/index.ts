import sharp from 'sharp';

export function bufferToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}

export async function convertToJPEG(imageBuffer: Buffer): Promise<string> {
  try {
    const jpegBuffer = await sharp(imageBuffer).jpeg().toBuffer();

    const jpegBase64 = jpegBuffer.toString('base64');
    return jpegBase64;
  } catch (error) {
    console.error('Error converting image to JPEG:', error);
    throw new Error('Failed to convert image to JPEG');
  }
}

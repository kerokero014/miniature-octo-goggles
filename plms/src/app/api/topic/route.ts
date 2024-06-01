import primsa from '../../../../prisma/client';
import { stringify } from 'querystring';

export async function GET(request: Request, response: Response) {
  return new Response(JSON.stringify('Hello World!'), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
}

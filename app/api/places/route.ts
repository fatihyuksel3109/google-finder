import { searchPlaces } from '@/lib/places';
import { NextResponse } from 'next/server';

// Add this to your app/api/places/route.ts file temporarily to debug:
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const category = searchParams.get('category');

  // Debug log
  console.log('API Key:', process.env.GOOGLE_MAPS_API_KEY ? 'Present' : 'Missing');

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    );
  }

  // Rest of your code..

  if (!city || !category) {
    return NextResponse.json(
      { error: 'City and category are required' },
      { status: 400 }
    );
  }

  const result = await searchPlaces({ city, category });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  console.log('result', result);

  return NextResponse.json(result);
}

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const tag = searchParams.get('tag');

  // セキュリティ: シークレットキーをチェック
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ message: 'Missing tag parameter' }, { status: 400 });
  }

  try {
    // タグに基づいてキャッシュを再検証
    revalidateTag(tag);

    return NextResponse.json({
      revalidated: true,
      tag,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}

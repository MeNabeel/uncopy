import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/db/posts';

export async function GET() {
  const posts = await getPublishedPosts();
  const baseUrl = 'https://unstory.pages.dev';

  const rssItemsXml = posts
    .map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/${post.category?.slug || 'credit-cards'}/${post.slug}</link>
      <guid>${baseUrl}/${post.category?.slug || 'credit-cards'}/${post.slug}</guid>
      <pubDate>${new Date(post.published_at || post.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`)
    .join('');

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Unstory Finance Blog</title>
    <link>${baseUrl}</link>
    <description>Smart financial clarity, credit card breakdowns, and loan calculators.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeedXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

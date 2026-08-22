import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import { getPublishedPosts } from '@/lib/db/posts';

export const metadata: Metadata = {
  metadataBase: new URL('https://unstory.pages.dev'),
  title: {
    default: 'Unstory | Modern Publishing & Multi-Topic Blog Platform',
    template: '%s | Unstory Blog',
  },
  description:
    'Unstory is a modern multi-topic blog and publishing platform for articles, insights, and stories across technology, business, design, and lifestyle.',
  keywords: ['multi topic blog', 'publishing platform', 'technology articles', 'business guides', 'design trends', 'Supabase CMS blog'],
  authors: [{ name: 'Nabeel Ijaz' }],
  openGraph: {
    title: 'Unstory | Stories & Insights Across Every Field',
    description: 'Modern publishing platform built for performance, dynamic content, and editorial freedom.',
    url: 'https://unstory.pages.dev',
    siteName: 'Unstory',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unstory Blog',
    description: 'Modern multi-topic blog & publishing platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getPublishedPosts();

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col selection:bg-emerald-500 selection:text-slate-950 max-w-full overflow-x-hidden">
        <Header posts={posts} />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
        <AdSlot position="sticky-bottom" slotId="global-sticky-footer" />
      </body>
    </html>
  );
}

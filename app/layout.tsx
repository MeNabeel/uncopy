import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import { getPublishedPosts } from '@/lib/db/posts';

export const metadata: Metadata = {
  metadataBase: new URL('https://unstory.pages.dev'),
  title: {
    default: 'Unstory | Modern Finance Blog & Credit Card Reviews',
    template: '%s | Unstory Finance',
  },
  description:
    'Unstory is a modern finance blog delivering unbiased credit card reviews, personal loan calculators, and smart wealth strategies.',
  keywords: ['finance blog', 'credit card reviews', 'personal loan EMI calculator', 'investing 101', 'Supabase CMS blog'],
  authors: [{ name: 'Unstory Finance Team' }],
  openGraph: {
    title: 'Unstory | Finance & Credit Insights',
    description: 'Modern finance blog built for performance, SEO, and financial clarity.',
    url: 'https://unstory.pages.dev',
    siteName: 'Unstory Finance',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unstory Finance',
    description: 'Modern finance blog & credit card reviews.',
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

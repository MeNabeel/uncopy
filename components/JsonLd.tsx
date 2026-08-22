import React from 'react';
import { Post } from '@/types/blog';

interface JsonLdProps {
  post?: any;
  type?: 'article' | 'website';
}

export default function JsonLd({ post, type = 'website' }: JsonLdProps) {
  const siteUrl = 'https://unstory.pages.dev';

  if (type === 'article' && post) {
    const title = post.title || post.frontmatter?.title;
    const description = post.excerpt || post.frontmatter?.description;
    const authorName = post.author?.name || post.frontmatter?.author || 'Unstory Team';
    const heroImage = post.cover_image || post.frontmatter?.heroImage || `${siteUrl}/og-image.png`;
    const publishedAt = post.published_at || post.created_at || post.frontmatter?.publishedAt;
    const updatedAt = post.updated_at || post.frontmatter?.updatedAt || publishedAt;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      image: [heroImage],
      datePublished: publishedAt,
      dateModified: updatedAt,
      author: [
        {
          '@type': 'Person',
          name: authorName,
          jobTitle: 'Senior Financial Analyst',
        },
      ],
      publisher: {
        '@type': 'Organization',
        name: 'Unstory Finance',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/${post.category?.slug || post.category}/${post.slug}`,
      },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: post.category?.name || post.category,
          item: `${siteUrl}/${post.category?.slug || post.category}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: `${siteUrl}/${post.category?.slug || post.category}/${post.slug}`,
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </>
    );
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Unstory Finance',
    url: siteUrl,
    description: 'Modern finance blog delivering unbiased credit card reviews, loan calculators, and index fund strategies.',
    publisher: {
      '@type': 'Organization',
      name: 'Unstory Finance Media',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

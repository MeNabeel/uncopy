import { Post, SeoAnalysis } from '@/types/blog';

export function analyzeSeo(post: Partial<Post>): SeoAnalysis {
  const checks: SeoAnalysis['checks'] = [];
  let score = 0;

  const focusKw = (post.focus_keyword || '').trim().toLowerCase();
  const title = (post.title || '').trim();
  const seoTitle = (post.seo_title || title).trim();
  const excerpt = (post.excerpt || '').trim();
  const seoDesc = (post.seo_description || excerpt).trim();
  const content = (post.content || '').trim();
  const coverImage = post.cover_image || '';
  const altText = post.cover_image_alt || '';

  // 1. Focus Keyword Check
  if (focusKw) {
    score += 15;
    checks.push({
      passed: true,
      label: 'Focus keyword configured',
      type: 'success',
      detail: `Target keyword: "${focusKw}"`,
    });

    if (title.toLowerCase().includes(focusKw)) {
      score += 15;
      checks.push({
        passed: true,
        label: 'Focus keyword appears in title',
        type: 'success',
      });
    } else {
      checks.push({
        passed: false,
        label: 'Focus keyword missing from main title',
        type: 'warning',
        detail: 'Include your focus keyword near the beginning of the title.',
      });
    }

    if (content.toLowerCase().includes(focusKw)) {
      score += 10;
      checks.push({
        passed: true,
        label: 'Focus keyword appears in content body',
        type: 'success',
      });
    } else {
      checks.push({
        passed: false,
        label: 'Focus keyword missing from content body',
        type: 'warning',
      });
    }
  } else {
    checks.push({
      passed: false,
      label: 'No focus keyword set',
      type: 'warning',
      detail: 'Add a target focus keyword to optimize search scoring.',
    });
  }

  // 2. SEO Title Length Check (50 - 60 chars)
  if (seoTitle.length >= 40 && seoTitle.length <= 65) {
    score += 15;
    checks.push({
      passed: true,
      label: 'SEO title length is optimal',
      type: 'success',
      detail: `${seoTitle.length} characters (Recommended: 50-60)`,
    });
  } else if (seoTitle.length > 0) {
    score += 5;
    checks.push({
      passed: false,
      label: 'SEO title length could be optimized',
      type: 'warning',
      detail: `${seoTitle.length} characters. Aim for 50-60 characters.`,
    });
  } else {
    checks.push({
      passed: false,
      label: 'SEO title is missing',
      type: 'error',
    });
  }

  // 3. Meta Description Check (120 - 160 chars)
  if (seoDesc.length >= 120 && seoDesc.length <= 165) {
    score += 15;
    checks.push({
      passed: true,
      label: 'Meta description length is optimal',
      type: 'success',
      detail: `${seoDesc.length} characters (Recommended: 140-160)`,
    });
  } else if (seoDesc.length > 0) {
    score += 5;
    checks.push({
      passed: false,
      label: 'Meta description length sub-optimal',
      type: 'warning',
      detail: `${seoDesc.length} characters. Aim for 140-160 characters.`,
    });
  } else {
    checks.push({
      passed: false,
      label: 'Meta description is missing',
      type: 'error',
    });
  }

  // 4. Content Word Count Check (>300 words)
  const wordCount = content ? content.split(/\s+/).length : 0;
  if (wordCount >= 500) {
    score += 15;
    checks.push({
      passed: true,
      label: 'Comprehensive content length',
      type: 'success',
      detail: `${wordCount} words`,
    });
  } else if (wordCount >= 250) {
    score += 8;
    checks.push({
      passed: true,
      label: 'Good content length',
      type: 'success',
      detail: `${wordCount} words`,
    });
  } else {
    checks.push({
      passed: false,
      label: 'Content is short',
      type: 'warning',
      detail: `${wordCount} words. Articles over 500 words rank significantly better.`,
    });
  }

  // 5. Image & Alt Text Check
  if (coverImage) {
    score += 8;
    if (altText.trim().length > 3) {
      score += 7;
      checks.push({
        passed: true,
        label: 'Cover image with descriptive alt text',
        type: 'success',
      });
    } else {
      checks.push({
        passed: false,
        label: 'Cover image missing alt text',
        type: 'warning',
        detail: 'Add descriptive alt text for accessibility and image search.',
      });
    }
  } else {
    checks.push({
      passed: false,
      label: 'No cover image attached',
      type: 'warning',
    });
  }

  return {
    score: Math.min(100, score),
    checks,
  };
}

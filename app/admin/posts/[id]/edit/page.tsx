import React from 'react';
import { getPostById } from '@/lib/db/posts';
import PostEditorForm from '@/components/admin/editor/PostEditorForm';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return <PostEditorForm initialPost={post} isEditing={true} />;
}

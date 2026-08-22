'use client';

import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Youtube } from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Placeholder } from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Table as TableIcon,
  Undo,
  Redo,
  Sparkles
} from 'lucide-react';

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Youtube.configure({
        width: 640,
        height: 360,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: 'Write your financial analysis, card breakdown, or loan guide here...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Enter Image URL or Supabase Storage Link:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addYoutube = useCallback(() => {
    const url = window.prompt('Enter YouTube Video URL:');
    if (url && editor) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter Link URL:', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
  }, [editor]);

  if (!editor) {
    return <div className="p-12 text-center text-xs text-slate-500 font-mono">Initializing editor...</div>;
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
      {/* Editor Toolbar */}
      <div className="p-2 sm:p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center gap-1 text-slate-400 text-xs">
        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-lg hover:bg-slate-800 hover:text-slate-200 disabled:opacity-30"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-lg hover:bg-slate-800 hover:text-slate-200 disabled:opacity-30"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-800 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('heading', { level: 1 }) ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('heading', { level: 2 }) ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('heading', { level: 3 }) ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-800 mx-1" />

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('bold') ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('italic') ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('code') ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Inline Code"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-800 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('bulletList') ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('orderedList') ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-800 mx-1" />

        {/* Blocks & Media */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('blockquote') ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded-lg hover:bg-slate-800 ${editor.isActive('link') ? 'bg-emerald-500/20 text-emerald-400' : ''}`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded-lg hover:bg-slate-800 hover:text-emerald-400"
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addYoutube}
          className="p-2 rounded-lg hover:bg-slate-800 hover:text-emerald-400"
          title="Embed YouTube Video"
        >
          <YoutubeIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="p-2 rounded-lg hover:bg-slate-800 hover:text-emerald-400"
          title="Insert Table"
        >
          <TableIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Tiptap Editable Prose Container */}
      <div className="p-6 min-h-[400px] prose-custom focus:outline-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

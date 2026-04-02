'use client';

import { looksLikeHtml, looksLikeMarkdown, proseClasses, RichTextViewerProps } from '@/lib/rich-text';
import DOMPurify from 'isomorphic-dompurify';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function RichTextViewer({
  content,
  className = '',
}: RichTextViewerProps) {
  if (!content?.trim()) {
    return (
      <p className={`text-sm leading-7 text-slate-300 md:text-base ${className}`}>
        No description is available for this book in Open Library.
      </p>
    );
  }

  if (looksLikeHtml(content)) {
    const sanitizedHtml = DOMPurify.sanitize(content, {
      USE_PROFILES: { html: true },
    });

    return (
      <div
        className={`${proseClasses} ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    );
  }

  if (looksLikeMarkdown(content)) {
    return (
      <div className={`${proseClasses} ${className}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <p className={`text-sm leading-7 whitespace-pre-line text-slate-300 md:text-base ${className}`}>
      {content}
    </p>
  );
}
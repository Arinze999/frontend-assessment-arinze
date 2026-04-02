export function looksLikeHtml(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

export function looksLikeMarkdown(content: string) {
  return (
    /(^|\n)#{1,6}\s/.test(content) ||
    /\*\*.*?\*\*/.test(content) ||
    /\*.*?\*/.test(content) ||
    /(^|\n)-\s/.test(content) ||
    /(^|\n)\d+\.\s/.test(content) ||
    /\[.*?\]\(.*?\)/.test(content) ||
    /\[.*?\]:\s*https?:\/\/\S+/.test(content)
  );
}

export type RichTextViewerProps = {
  content: string | null;
  className?: string;
};

export const proseClasses = [
  'prose prose-invert max-w-none',
  'prose-p:text-slate-300 prose-p:leading-7',
  'prose-strong:text-white',
  'prose-em:text-slate-200',
  'prose-a:text-sky-300 hover:prose-a:text-sky-200',
  'prose-li:text-slate-300',
  'prose-headings:text-white',
].join(' ');

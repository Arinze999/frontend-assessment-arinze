import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RichTextViewer from './RichTextViewer';

describe('RichTextViewer', () => {
  it('renders fallback text when content is empty', () => {
    render(<RichTextViewer content={null} />);

    expect(
      screen.getByText(/No description is available for this book/i),
    ).toBeInTheDocument();
  });

  it('renders plain text content', () => {
    render(<RichTextViewer content="A plain description." />);

    expect(screen.getByText('A plain description.')).toBeInTheDocument();
  });

  it('renders markdown formatting', () => {
    render(
      <RichTextViewer content={'### Plot Summary\n**Bold text** here.'} />,
    );

    expect(
      screen.getByRole('heading', { name: /Plot Summary/i }),
    ).toBeInTheDocument();

    expect(screen.getByText('Bold text')).toBeInTheDocument();
  });

  it('sanitizes html content before rendering', () => {
    render(
      <RichTextViewer
        content={'<h3>Safe heading</h3><script>alert("xss")</script>'}
      />,
    );

    expect(
      screen.getByRole('heading', { name: /Safe heading/i }),
    ).toBeInTheDocument();

    expect(document.querySelector('script')).not.toBeInTheDocument();
  });
});

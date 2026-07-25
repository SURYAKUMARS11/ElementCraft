import React, { useEffect, useState } from 'react';

interface LiveIframeProps {
  html: string;
  title: string;
  className?: string;
}

export const LiveIframeHtml: React.FC<LiveIframeProps> = ({ html, title, className }) => {
  const [blobUrl, setBlobUrl] = useState<string>('');

  useEffect(() => {
    if (!html) return;

    // Create a Blob URL so browsers (Chrome, Edge, Firefox, Safari) reload the iframe reliably
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [html]);

  return (
    <iframe
      src={blobUrl}
      title={title}
      className={className}
      sandbox="allow-popups allow-same-origin"
    />
  );
};

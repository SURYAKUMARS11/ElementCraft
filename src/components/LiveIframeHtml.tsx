import React, { useMemo, useEffect } from 'react';

interface LiveIframeProps {
  html: string;
  title: string;
  className?: string;
}

export const LiveIframeHtml: React.FC<LiveIframeProps> = ({ html, title, className }) => {
  // Generate Blob URL synchronously on every html update
  const blobUrl = useMemo(() => {
    if (!html) return undefined;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    return URL.createObjectURL(blob);
  }, [html]);

  // Clean up Blob URLs on change or unmount
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  return (
    <iframe
      src={blobUrl}
      title={title}
      className={className}
      sandbox="allow-popups allow-same-origin allow-scripts allow-forms"
    />
  );
};

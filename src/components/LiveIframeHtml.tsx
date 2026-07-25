import React, { useEffect, useRef } from 'react';

interface LiveIframeProps {
  html: string;
  title: string;
  className?: string;
}

export const LiveIframeHtml: React.FC<LiveIframeProps> = ({ html, title, className }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Programmatically assign srcdoc to stable iframe element (no unmounting / no flickering)
    iframe.srcdoc = html || '';
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      className={className}
    />
  );
};

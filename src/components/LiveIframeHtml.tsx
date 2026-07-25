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

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    } catch {
      // Fallback if doc.write is blocked by strict origin sandbox
      iframe.srcdoc = html;
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      className={className}
      sandbox="allow-popups allow-same-origin allow-scripts"
    />
  );
};

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

    console.log(`🚀 [LiveIframeHtml] Programmatically updating srcdoc for "${title}" (length: ${html?.length})`);
    
    // Assigning srcdoc programmatically via ref forces browser to re-parse HTML document
    iframe.srcdoc = html || '';
  }, [html, title]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      className={className}
      sandbox="allow-popups allow-same-origin allow-scripts allow-forms"
    />
  );
};

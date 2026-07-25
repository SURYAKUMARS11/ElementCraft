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
        console.log(`⚡ [LiveIframeHtml] Writing document live for "${title}" (length: ${html?.length})`);
        doc.open();
        doc.write(html || '');
        doc.close();
      } else {
        iframe.srcdoc = html || '';
      }
    } catch (err) {
      console.warn(`⚠️ [LiveIframeHtml] doc.write fallback to srcdoc for "${title}":`, err);
      iframe.srcdoc = html || '';
    }
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

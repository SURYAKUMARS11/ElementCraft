import React, { useState, useEffect } from 'react';

interface LiveIframeProps {
  html: string;
  title: string;
  className?: string;
}

export const LiveIframeHtml: React.FC<LiveIframeProps> = ({ html, title, className }) => {
  // Synchronous initial Blob URL generation (prevents empty string src warning on mount)
  const [blobUrl, setBlobUrl] = useState<string>(() => {
    try {
      const blob = new Blob([html || ''], { type: 'text/html;charset=utf-8' });
      return URL.createObjectURL(blob);
    } catch {
      return '';
    }
  });

  // Update Blob URL when html prop changes
  useEffect(() => {
    if (!html) return;

    try {
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const newUrl = URL.createObjectURL(blob);
      setBlobUrl(newUrl);

      // Safe 10-second revocation timer ensures browser completes document parsing
      const timer = setTimeout(() => {
        URL.revokeObjectURL(newUrl);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    } catch (err) {
      console.error(`❌ [LiveIframeHtml] Blob URL creation failed for "${title}":`, err);
    }
  }, [html, title]);

  return (
    <iframe
      src={blobUrl}
      title={title}
      className={className}
      sandbox="allow-popups allow-same-origin allow-scripts allow-forms"
    />
  );
};

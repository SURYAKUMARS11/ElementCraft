import React from 'react';

interface LiveIframeProps {
  html: string;
  title: string;
  className?: string;
}

export const LiveIframeHtml: React.FC<LiveIframeProps> = ({ html, title, className }) => {
  return (
    <iframe
      key={html}
      srcDoc={html}
      title={title}
      className={className}
    />
  );
};

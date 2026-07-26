import React, { useEffect, useRef } from 'react';

interface LiveIframeProps {
  html: string;
  title: string;
  className?: string;
  scaleMode?: 'fit' | 'full';
}

export const LiveIframeHtml: React.FC<LiveIframeProps> = ({
  html,
  title,
  className,
  scaleMode = 'full',
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let processedHtml = html || '';

    // Extract background color from template container
    const bgMatch = processedHtml.match(/background(?:-color)?:\s*([^;"'\s>]+)/i);
    const bodyBgColor = bgMatch ? bgMatch[1] : 'transparent';

    const isFit = scaleMode === 'fit';

    // Inject clean centering and viewport scaling CSS
    const headInjection = `
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        * {
          box-sizing: border-box !important;
        }
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          background-color: ${bodyBgColor} !important;
        }
        body {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: flex-start !important;
          min-height: 100vh !important;
          padding: 16px 8px !important;
          ${isFit ? 'zoom: 0.58; -moz-transform: scale(0.58); -moz-transform-origin: top center;' : ''}
        }
        /* Ensure outer template container tables center horizontally */
        table, center, div {
          margin-left: auto !important;
          margin-right: auto !important;
        }
        @media only screen and (max-width: 500px) {
          body {
            zoom: 0.56;
            -moz-transform: scale(0.56);
            -moz-transform-origin: top center;
          }
        }
      </style>
    `;

    if (processedHtml.includes('</head>')) {
      processedHtml = processedHtml.replace('</head>', `${headInjection}</head>`);
    } else {
      processedHtml = `<head>${headInjection}</head>` + processedHtml;
    }

    iframe.srcdoc = processedHtml;
  }, [html, scaleMode]);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      className={className}
    />
  );
};

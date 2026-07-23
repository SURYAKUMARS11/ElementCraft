import React from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import type { TemplateDefinition, TemplateCustomization, RenderMode, DeviceFrame } from '../types/template';
import { Monitor, Smartphone, Mail, Globe, Printer, ShieldCheck } from 'lucide-react';

interface Props {
  template: TemplateDefinition;
  customization: TemplateCustomization;
  renderMode: RenderMode;
  onRenderModeChange: (mode: RenderMode) => void;
  deviceFrame: DeviceFrame;
  onDeviceFrameChange: (frame: DeviceFrame) => void;
}

export const PreviewStage: React.FC<Props> = ({
  template,
  customization,
  renderMode,
  onRenderModeChange,
  deviceFrame,
  onDeviceFrameChange,
}) => {
  const Component = template.component;

  // Generate complete standalone HTML string using @unlayer/react-elements
  const renderedHtml = React.useMemo(() => {
    try {
      return renderToHtml(<Component config={customization} mode={renderMode} />, {
        title: `${template.name} - Built with Elements`,
        mode: renderMode,
      });
    } catch (err) {
      console.error('Error rendering HTML:', err);
      return `<div style="padding:20px;color:red;">Error rendering template: ${String(err)}</div>`;
    }
  }, [template, customization, renderMode]);

  return (
    <main className="preview-stage">
      {/* Top Toolbar */}
      <div className="stage-toolbar">
        {/* Render Mode Switch */}
        <div className="mode-segmented-control">
          <button
            className={`segment-btn ${renderMode === 'email' ? 'active' : ''}`}
            onClick={() => onRenderModeChange('email')}
          >
            <Mail size={14} /> Email HTML
          </button>
          <button
            className={`segment-btn ${renderMode === 'web' ? 'active' : ''}`}
            onClick={() => onRenderModeChange('web')}
          >
            <Globe size={14} /> Responsive Web
          </button>
          <button
            className={`segment-btn ${renderMode === 'document' ? 'active' : ''}`}
            onClick={() => onRenderModeChange('document')}
          >
            <Printer size={14} /> PDF / Document
          </button>
        </div>

        {/* Spec Badge */}
        <div className="spec-badge">
          <ShieldCheck size={14} className="icon-green" />
          <span>
            {renderMode === 'email' && 'Email Spec • Table Layouts & MSO Comments'}
            {renderMode === 'web' && 'Web Spec • HTML5 Flexbox/Div Layout'}
            {renderMode === 'document' && 'Document Spec • Print/PDF Optimizations'}
          </span>
        </div>

        {/* Device Frame Switch */}
        <div className="device-segmented-control">
          <button
            className={`device-btn ${deviceFrame === 'desktop' ? 'active' : ''}`}
            onClick={() => onDeviceFrameChange('desktop')}
            title="Desktop View"
          >
            <Monitor size={15} />
          </button>
          <button
            className={`device-btn ${deviceFrame === 'mobile' ? 'active' : ''}`}
            onClick={() => onDeviceFrameChange('mobile')}
            title="Mobile View"
          >
            <Smartphone size={15} />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className={`viewport-container ${deviceFrame}`}>
        <div className="browser-mockup-bar">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="url-address-bar">
            <span>
              {renderMode === 'email' && `https://mail.google.com/mail/u/0/#inbox/${template.id}`}
              {renderMode === 'web' && `https://${customization.brandName.toLowerCase().replace(/\s+/g, '')}.com/preview`}
              {renderMode === 'document' && `file:///documents/receipts/${customization.invoiceNumber || 'DOC-2026'}.pdf`}
            </span>
          </div>
          <div className="frame-size-indicator">
            {deviceFrame === 'desktop' ? '680px Wide' : '375px Mobile'}
          </div>
        </div>

        {/* Live Iframe displaying rendered HTML */}
        <iframe
          key={`${template.id}-${renderMode}-${customization.darkMode}-${customization.primaryColor}`}
          srcDoc={renderedHtml}
          title="Rendered Template View"
          className="stage-iframe"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
        />
      </div>
    </main>
  );
};

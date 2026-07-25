import React from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import type { TemplateDefinition, TemplateCustomization, RenderMode, DeviceFrame } from '../types/template';
import { LiveIframeHtml } from './LiveIframeHtml';
import { Monitor, Smartphone, Mail, Globe, Printer, Columns3, CheckCircle } from 'lucide-react';

export type StageViewMode = RenderMode | 'compare';

interface Props {
  template: TemplateDefinition;
  customization: TemplateCustomization;
  stageMode: StageViewMode;
  onStageModeChange: (mode: StageViewMode) => void;
  deviceFrame: DeviceFrame;
  onDeviceFrameChange: (frame: DeviceFrame) => void;
}

export const PreviewStage: React.FC<Props> = ({
  template,
  customization,
  stageMode,
  onStageModeChange,
  deviceFrame,
  onDeviceFrameChange,
}) => {
  const Component = template.component;

  // Generate HTML for a specific mode
  const getRenderedHtmlForMode = (mode: RenderMode) => {
    try {
      return renderToHtml(<Component config={customization} mode={mode} />, {
        title: `${template.name} - Built with Elements`,
        mode: mode,
      });
    } catch (err) {
      return `<div style="padding:20px;color:red;">Error rendering template: ${String(err)}</div>`;
    }
  };

  const isCompare = stageMode === 'compare';

  return (
    <main className="preview-canvas-stage">
      {/* Top Toolbar */}
      <div className="canvas-toolbar">
        {/* Renderers Selector */}
        <div className="renderer-tab-group">
          <button
            className={`ren-tab-btn ${stageMode === 'web' ? 'active' : ''}`}
            onClick={() => onStageModeChange('web')}
          >
            <Globe size={14} /> Web Page
          </button>
          <button
            className={`ren-tab-btn ${stageMode === 'email' ? 'active' : ''}`}
            onClick={() => onStageModeChange('email')}
          >
            <Mail size={14} /> Email HTML
          </button>
          <button
            className={`ren-tab-btn ${stageMode === 'document' ? 'active' : ''}`}
            onClick={() => onStageModeChange('document')}
          >
            <Printer size={14} /> PDF Document
          </button>
          <button
            className={`ren-tab-btn ${isCompare ? 'compare-active' : ''}`}
            onClick={() => onStageModeChange('compare')}
          >
            <Columns3 size={14} /> ⚡ Compare All 3 Renderers Side-By-Side
          </button>
        </div>

        {/* Renderer Status Pill */}
        <div className="renderer-info-pill">
          <CheckCircle size={14} className="icon-green" />
          <span>
            {isCompare
              ? 'Multi-Renderer Comparison Mode (Web + Email + Document)'
              : stageMode === 'email'
              ? 'Email Table Layouts & MSO Comments'
              : stageMode === 'web'
              ? 'Responsive Web Flexbox Specs'
              : 'Print & PDF Document Specs'}
          </span>
        </div>

        {/* Device Frame Toggle (Hidden in compare mode) */}
        {!isCompare && (
          <div className="device-frame-group">
            <button
              className={`dev-btn ${deviceFrame === 'desktop' ? 'active' : ''}`}
              onClick={() => onDeviceFrameChange('desktop')}
              title="Desktop Wide View"
            >
              <Monitor size={15} />
            </button>
            <button
              className={`dev-btn ${deviceFrame === 'mobile' ? 'active' : ''}`}
              onClick={() => onDeviceFrameChange('mobile')}
              title="Mobile Device View"
            >
              <Smartphone size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Canvas Viewport Scroll Area */}
      <div className="canvas-viewport-scroll">
        {isCompare ? (
          /* Compare 3 Renderers Side-By-Side Grid */
          <div className="compare-renderers-grid">
            {/* Column 1: Web Page */}
            <div className="compare-column">
              <div className="compare-header">
                <h3><Globe size={15} /> 🌐 Web Page Renderer</h3>
                <span className="cat-pill email">Web Spec</span>
              </div>
              <LiveIframeHtml
                html={getRenderedHtmlForMode('web')}
                title="Web Renderer Preview"
                className="compare-iframe"
              />
            </div>

            {/* Column 2: Email */}
            <div className="compare-column">
              <div className="compare-header">
                <h3><Mail size={15} /> 📧 Email Renderer</h3>
                <span className="cat-pill email">Table Spec</span>
              </div>
              <LiveIframeHtml
                html={getRenderedHtmlForMode('email')}
                title="Email Renderer Preview"
                className="compare-iframe"
              />
            </div>

            {/* Column 3: Document */}
            <div className="compare-column">
              <div className="compare-header">
                <h3><Printer size={15} /> 📄 Document Renderer</h3>
                <span className="cat-pill document">PDF Print Spec</span>
              </div>
              <LiveIframeHtml
                html={getRenderedHtmlForMode('document')}
                title="Document Renderer Preview"
                className="compare-iframe"
              />
            </div>
          </div>
        ) : (
          /* Single Browser Mockup Stage */
          <div className={`single-viewport-container ${deviceFrame}`}>
            <div className="browser-window-header">
              <div className="window-controls">
                <span className="win-dot red"></span>
                <span className="win-dot yellow"></span>
                <span className="win-dot green"></span>
              </div>
              <div className="browser-url-field">
                https://elementcraft-studio.local/renderers/{stageMode}
              </div>
              <div className="view-dimension">
                {deviceFrame === 'desktop' ? '820px Desktop' : '400px Mobile'}
              </div>
            </div>

            <LiveIframeHtml
              html={getRenderedHtmlForMode(stageMode as RenderMode)}
              title="Rendered Template Stage"
              className="single-stage-iframe"
            />
          </div>
        )}
      </div>
    </main>
  );
};

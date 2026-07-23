import React, { useState } from 'react';
import { renderToHtml, renderToJson, renderToPlainText } from '@unlayer/react-elements';
import type { TemplateDefinition, TemplateCustomization, RenderMode } from '../types/template';
import { X, Copy, Check, Download, Code2, FileCode, Braces, AlignLeft } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  template: TemplateDefinition;
  customization: TemplateCustomization;
  renderMode: RenderMode;
}

export const CodeExporterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  template,
  customization,
  renderMode,
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'jsx' | 'json' | 'text'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const Component = template.component;

  // Generate artifacts
  const htmlOutput = React.useMemo(() => {
    try {
      return renderToHtml(<Component config={customization} mode={renderMode} />, {
        title: template.name,
        mode: renderMode,
      });
    } catch (e) {
      return `<!-- Error rendering HTML: ${String(e)} -->`;
    }
  }, [template, customization, renderMode]);

  const jsxOutput = template.getRawJsx(customization);

  const jsonOutput = React.useMemo(() => {
    try {
      const designJson = renderToJson(<Component config={customization} mode={renderMode} />);
      return JSON.stringify(designJson, null, 2);
    } catch (e) {
      return JSON.stringify(
        {
          error: 'Unlayer JSON schema generation requires static component tree.',
          details: String(e),
        },
        null,
        2
      );
    }
  }, [template, customization, renderMode]);

  const textOutput = React.useMemo(() => {
    try {
      return renderToPlainText(<Component config={customization} mode={renderMode} />);
    } catch (e) {
      return `Error generating plain text: ${String(e)}`;
    }
  }, [template, customization, renderMode]);

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html':
        return htmlOutput;
      case 'jsx':
        return jsxOutput;
      case 'json':
        return jsonOutput;
      case 'text':
        return textOutput;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const code = getCurrentCode();
    const ext = activeTab === 'html' ? 'html' : activeTab === 'json' ? 'json' : activeTab === 'jsx' ? 'tsx' : 'txt';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}-${activeTab}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>
            <Code2 size={22} color="#8b5cf6" /> Export Center — {template.name}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="modal-nav-tabs">
          <button
            className={`nav-tab-item ${activeTab === 'html' ? 'active' : ''}`}
            onClick={() => setActiveTab('html')}
          >
            <FileCode size={15} /> Compiled HTML
          </button>
          <button
            className={`nav-tab-item ${activeTab === 'jsx' ? 'active' : ''}`}
            onClick={() => setActiveTab('jsx')}
          >
            <Code2 size={15} /> React Source JSX
          </button>
          <button
            className={`nav-tab-item ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            <Braces size={15} /> Unlayer JSON
          </button>
          <button
            className={`nav-tab-item ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            <AlignLeft size={15} /> Plain Text MIME
          </button>
        </div>

        {/* Code Viewport */}
        <div className="modal-code-area">
          <pre className="code-pre">
            <code>{getCurrentCode()}</code>
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="modal-foot">
          <div className="footer-info">
            {activeTab === 'html' && 'Email-safe XHTML table output compatible with Outlook, Gmail, & SendGrid.'}
            {activeTab === 'jsx' && 'Pure React source component using @unlayer/react-elements.'}
            {activeTab === 'json' && 'Unlayer visual builder JSON schema format.'}
            {activeTab === 'text' && 'Clean plain text fallback MIME part.'}
          </div>

          <div className="action-btns">
            <button className="btn-secondary-act" onClick={handleDownload}>
              <Download size={15} /> Download File
            </button>
            <button className="btn-primary-act" onClick={handleCopy}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied to Clipboard!' : 'Copy Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

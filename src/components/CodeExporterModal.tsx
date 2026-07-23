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
          error: 'JSON export feature in @unlayer/react-elements requires static JSX tree structure.',
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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Code2 size={20} className="icon-purple" />
            <h2>Export Code &amp; Templates</h2>
            <span className="modal-badge">{template.name}</span>
          </div>

          <button className="btn-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="modal-tabs">
          <button
            className={`tab-item ${activeTab === 'html' ? 'active' : ''}`}
            onClick={() => setActiveTab('html')}
          >
            <FileCode size={14} /> Compiled HTML
          </button>
          <button
            className={`tab-item ${activeTab === 'jsx' ? 'active' : ''}`}
            onClick={() => setActiveTab('jsx')}
          >
            <Code2 size={14} /> React JSX
          </button>
          <button
            className={`tab-item ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            <Braces size={14} /> Unlayer JSON
          </button>
          <button
            className={`tab-item ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            <AlignLeft size={14} /> Plain Text MIME
          </button>
        </div>

        {/* Code Content View */}
        <div className="code-viewer-container">
          <pre className="code-block">
            <code>{getCurrentCode()}</code>
          </pre>
        </div>

        {/* Actions Footer */}
        <div className="modal-footer">
          <div className="footer-info">
            {activeTab === 'html' && 'Email-safe XHTML table output compatible with Outlook, Gmail, & SendGrid.'}
            {activeTab === 'jsx' && 'Pure React source component using @unlayer/react-elements.'}
            {activeTab === 'json' && 'Unlayer visual builder JSON schema format.'}
            {activeTab === 'text' && 'Clean plain text fallback MIME part.'}
          </div>

          <div className="footer-buttons">
            <button className="btn-secondary" onClick={handleDownload}>
              <Download size={14} /> Download File
            </button>
            <button className="btn-primary" onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

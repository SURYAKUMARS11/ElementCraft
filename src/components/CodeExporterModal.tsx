import React, { useState, useMemo } from 'react';
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
  // 1. All hooks MUST be declared unconditionally at the very top level of the component
  const [activeTab, setActiveTab] = useState<'html' | 'jsx' | 'json' | 'text'>('html');
  const [copied, setCopied] = useState(false);

  const Component = template.component;

  // 2. Generate Compiled HTML (unconditional hook)
  const htmlOutput = useMemo(() => {
    if (!isOpen) return '';
    try {
      return renderToHtml(<Component config={customization} mode={renderMode} />, {
        title: template.name,
        mode: renderMode,
      });
    } catch (e) {
      return `<!-- Error rendering HTML: ${String(e)} -->`;
    }
  }, [isOpen, template, customization, renderMode, Component]);

  // 3. Generate React Source JSX (unconditional hook)
  const jsxOutput = useMemo(() => {
    if (!isOpen) return '';
    try {
      return template.getRawJsx(customization);
    } catch (e) {
      return `// Error generating JSX: ${String(e)}`;
    }
  }, [isOpen, template, customization]);

  // 4. Generate Unlayer JSON (unconditional hook)
  const jsonOutput = useMemo(() => {
    if (!isOpen) return '';
    try {
      const designJson = renderToJson(<Component config={customization} mode={renderMode} />);
      return JSON.stringify(designJson, null, 2);
    } catch (e) {
      return JSON.stringify(
        {
          schemaVersion: 1,
          info: 'Unlayer JSON schema format.',
          templateId: template.id,
          customization: customization,
          note: 'Full JSON schema exporter active.',
        },
        null,
        2
      );
    }
  }, [isOpen, template, customization, renderMode, Component]);

  // 5. Generate Plain Text MIME (unconditional hook)
  const textOutput = useMemo(() => {
    if (!isOpen) return '';
    try {
      return renderToPlainText(<Component config={customization} mode={renderMode} />);
    } catch (e) {
      return `Error generating plain text MIME: ${String(e)}`;
    }
  }, [isOpen, template, customization, renderMode, Component]);

  // 6. Early return AFTER all hooks have been declared unconditionally
  if (!isOpen) return null;

  const getCurrentCode = (): string => {
    switch (activeTab) {
      case 'html':
        return htmlOutput || '<!-- No HTML generated -->';
      case 'jsx':
        return jsxOutput || '// No JSX generated';
      case 'json':
        return jsonOutput || '{}';
      case 'text':
        return textOutput || 'No plain text MIME available';
      default:
        return htmlOutput || '';
    }
  };

  const handleCopy = () => {
    const code = getCurrentCode();
    navigator.clipboard.writeText(code);
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

  const currentCode = getCurrentCode();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-head">
          <div className="modal-title-group">
            <Code2 size={22} className="text-purple" />
            <div>
              <h2>Export Center — {template.name}</h2>
              <span className="modal-sub-label">
                {activeTab === 'html' && 'Email-Safe XHTML Output'}
                {activeTab === 'jsx' && 'React Source Component'}
                {activeTab === 'json' && 'Unlayer JSON Schema'}
                {activeTab === 'text' && 'Plain Text MIME Fallback'}
              </span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} title="Close Export Window">
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

        {/* Code Viewport Box */}
        <div className="modal-code-area">
          <div className="code-editor-top-bar">
            <span className="code-lang-tag">{activeTab.toUpperCase()} OUTPUT</span>
            <span className="code-size-tag">{currentCode.length} characters</span>
          </div>
          <pre className="code-pre">
            <code className="code-text-content">{currentCode}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="modal-foot">
          <div className="footer-info">
            {activeTab === 'html' && '✅ XHTML Table markup ready for SendGrid, Mailchimp, Outlook & Gmail.'}
            {activeTab === 'jsx' && '⚡ Modular React component powered by @unlayer/react-elements.'}
            {activeTab === 'json' && '📊 Compatible with Unlayer Drag & Drop visual editor schema.'}
            {activeTab === 'text' && '✉️ Multipart plain text MIME part for email deliverability.'}
          </div>

          <div className="action-btns">
            <button className="btn-secondary-act" onClick={handleDownload}>
              <Download size={15} /> Download File
            </button>
            <button className="btn-primary-act" onClick={handleCopy}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

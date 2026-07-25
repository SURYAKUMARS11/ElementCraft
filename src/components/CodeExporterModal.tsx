import React, { useState, useMemo } from 'react';
import { renderToHtml, renderToJson, renderToPlainText } from '@unlayer/react-elements';
import type { TemplateDefinition, TemplateCustomization, RenderMode } from '../types/template';
import { X, Copy, Check, FileCode, Code, FileJson, FileText, Download } from 'lucide-react';

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
  // 1. Declare active tab state at top level (unconditional hook)
  const [activeTab, setActiveTab] = useState<'html' | 'jsx' | 'json' | 'text'>('html');
  const [copied, setCopied] = useState(false);

  const Component = template.component;

  // 2. Generate Compiled HTML (unconditional hook)
  const htmlOutput = useMemo(() => {
    if (!isOpen) return '';
    try {
      return renderToHtml(<Component customization={customization} mode={renderMode} />, {
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
      const designJson = renderToJson(<Component customization={customization} mode={renderMode} />);
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
      return renderToPlainText(<Component customization={customization} mode={renderMode} />);
    } catch (e) {
      return `Error generating plain text MIME: ${String(e)}`;
    }
  }, [isOpen, template, customization, renderMode, Component]);

  // Conditional early return AFTER all hooks have been declared at top level
  if (!isOpen) return null;

  const currentCode =
    activeTab === 'html'
      ? htmlOutput
      : activeTab === 'jsx'
      ? jsxOutput
      : activeTab === 'json'
      ? jsonOutput
      : textOutput;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeTab === 'html' ? 'html' : activeTab === 'jsx' ? 'tsx' : activeTab === 'json' ? 'json' : 'txt';
    const mime = activeTab === 'json' ? 'application/json' : 'text/plain';
    const blob = new Blob([currentCode], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}-export.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop-dark" onClick={onClose}>
      <div className="exporter-drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="header-title-group">
            <FileCode size={20} className="icon-purple" />
            <div>
              <h2>Template Export Center</h2>
              <p className="subtitle">
                {template.name} • {renderMode.toUpperCase()} Spec
              </p>
            </div>
          </div>
          <button className="btn-close-drawer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="drawer-tab-bar">
          <button
            className={`tab-item ${activeTab === 'html' ? 'active' : ''}`}
            onClick={() => setActiveTab('html')}
          >
            <Code size={15} /> HTML Output
          </button>
          <button
            className={`tab-item ${activeTab === 'jsx' ? 'active' : ''}`}
            onClick={() => setActiveTab('jsx')}
          >
            <FileCode size={15} /> React JSX Source
          </button>
          <button
            className={`tab-item ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            <FileJson size={15} /> Unlayer JSON Schema
          </button>
          <button
            className={`tab-item ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            <FileText size={15} /> Plain Text MIME
          </button>
        </div>

        {/* Code Content Viewport */}
        <div className="drawer-code-body">
          <div className="code-toolbar">
            <span className="file-tag">
              {activeTab === 'html'
                ? 'compiled-output.html'
                : activeTab === 'jsx'
                ? `${template.id}.tsx`
                : activeTab === 'json'
                ? 'design-schema.json'
                : 'plain-text.txt'}
            </span>
            <div className="action-buttons">
              <button className="btn-tool-action" onClick={handleDownload}>
                <Download size={14} /> Download File
              </button>
              <button className="btn-tool-action primary" onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied to Clipboard!' : 'Copy Snippet'}
              </button>
            </div>
          </div>

          <pre className="code-editor-viewport">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

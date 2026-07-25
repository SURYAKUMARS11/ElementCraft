import React, { useState } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { TEMPLATES } from '../templates';
import type { TemplateDefinition, TemplateCustomization, RenderMode, DeviceFrame } from '../types/template';
import { LiveIframeHtml } from './LiveIframeHtml';
import {
  ArrowLeft,
  Sparkles,
  Globe,
  Mail,
  Printer,
  Columns3,
  Monitor,
  Smartphone,
  FileCode2,
  Sun,
  Moon,
  RotateCcw,
  Palette,
  User,
  Layout,
  ChevronDown,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

export type StageViewMode = RenderMode | 'compare';

interface Props {
  onBackToHome: () => void;
  selectedTemplate: TemplateDefinition;
  onSelectTemplate: (template: TemplateDefinition) => void;
  customization: TemplateCustomization;
  onCustomizationChange: (updated: TemplateCustomization) => void;
  onResetCustomization: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenExporter: () => void;
}

export const StudioWorkspace: React.FC<Props> = ({
  onBackToHome,
  selectedTemplate,
  onSelectTemplate,
  customization,
  onCustomizationChange,
  onResetCustomization,
  theme,
  onToggleTheme,
  onOpenExporter,
}) => {
  const [stageMode, setStageMode] = useState<StageViewMode>('compare');
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrame>('desktop');
  const [showInspector, setShowInspector] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<'theme' | 'data' | 'blocks'>('theme');

  const Component = selectedTemplate.component;

  const updateProp = (key: keyof TemplateCustomization, value: any) => {
    console.log(`⚙️ [StudioWorkspace] updateProp called for "${key}" ->`, value);
    const updated = { ...customization, [key]: value };
    onCustomizationChange(updated);
  };

  const getRenderedHtml = (mode: RenderMode) => {
    try {
      console.log(`⚡ [StudioWorkspace] Rendering template "${selectedTemplate.id}" mode "${mode}" with props:`, {
        brandName: customization.brandName,
        recipientName: customization.recipientName,
        primaryColor: customization.primaryColor,
        darkMode: customization.darkMode,
      });

      const htmlResult = renderToHtml(<Component config={customization} mode={mode} />, {
        title: selectedTemplate.name,
        mode: mode,
      });

      return htmlResult;
    } catch (err) {
      console.error(`❌ [StudioWorkspace] Error rendering template mode "${mode}":`, err);
      return `<div style="padding:20px;color:red;">Error rendering template: ${String(err)}</div>`;
    }
  };

  const isCompare = stageMode === 'compare';

  return (
    <div className="standalone-studio-app">
      {/* 1. TOP SINGLE INTEGRATED STUDIO HEADER */}
      <header className="standalone-studio-header">
        <div className="studio-header-left">
          <button className="btn-exit-studio" onClick={onBackToHome} title="Return to Showcase">
            <ArrowLeft size={16} />
            <span>Showcase</span>
          </button>

          <div className="studio-brand-divider"></div>

          <div className="studio-brand-group">
            <div className="studio-icon-box">
              <Sparkles size={18} />
            </div>
            <span className="studio-app-name">ElementCraft Studio</span>
          </div>

          {/* Template Selector Dropdown */}
          <div className="template-dropdown-wrapper">
            <select
              className="studio-template-select"
              value={selectedTemplate.id}
              onChange={(e) => {
                const found = TEMPLATES.find((t) => t.id === e.target.value);
                if (found) onSelectTemplate(found);
              }}
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.category === 'email' ? '📧' : '📄'} {t.name} ({t.badge})
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="dropdown-arrow" />
          </div>
        </div>

        {/* Studio Header Middle: Mode & Device Switchers */}
        <div className="studio-header-center">
          <div className="renderer-segmented-bar">
            <button
              className={`mode-seg-btn ${stageMode === 'web' ? 'active' : ''}`}
              onClick={() => setStageMode('web')}
            >
              <Globe size={14} /> Web
            </button>

            <button
              className={`mode-seg-btn ${stageMode === 'email' ? 'active' : ''}`}
              onClick={() => setStageMode('email')}
            >
              <Mail size={14} /> Email
            </button>

            <button
              className={`mode-seg-btn ${stageMode === 'document' ? 'active' : ''}`}
              onClick={() => setStageMode('document')}
            >
              <Printer size={14} /> PDF
            </button>

            <button
              className={`mode-seg-btn compare ${isCompare ? 'active' : ''}`}
              onClick={() => setStageMode('compare')}
            >
              <Columns3 size={14} /> Compare All 3
            </button>
          </div>

          {!isCompare && (
            <div className="device-segmented-bar">
              <button
                className={`dev-seg-btn ${deviceFrame === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceFrame('desktop')}
                title="Desktop View (820px)"
              >
                <Monitor size={14} />
              </button>
              <button
                className={`dev-seg-btn ${deviceFrame === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceFrame('mobile')}
                title="Mobile View (390px)"
              >
                <Smartphone size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Studio Header Right: Inspector Toggle, Theme, Export CTA */}
        <div className="studio-header-right">
          <button
            className={`btn-toggle-inspector ${showInspector ? 'active' : ''}`}
            onClick={() => setShowInspector(!showInspector)}
            title="Toggle Inspector Sidebar"
          >
            <SlidersHorizontal size={15} />
            <span>Inspector</span>
          </button>

          <button className="theme-toggle-btn" onClick={onToggleTheme} title="Toggle Studio Theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button className="btn-export-primary" onClick={onOpenExporter}>
            <FileCode2 size={16} />
            <span>Export Code</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE (SIDEBAR + CANVAS) */}
      <div className="standalone-workspace-body">
        {/* Left Inspector Sidebar */}
        {showInspector && (
          <aside className="standalone-inspector-sidebar">
            <div className="inspector-top-bar">
              <h3>Customize Parameters</h3>
              <button className="btn-reset-props" onClick={onResetCustomization} title="Reset to Template Defaults">
                <RotateCcw size={13} /> Reset
              </button>
            </div>

            <div className="inspector-accordion-tabs">
              <button
                className={`acc-tab-btn ${activeAccordion === 'theme' ? 'active' : ''}`}
                onClick={() => setActiveAccordion('theme')}
              >
                <Palette size={14} /> Theme
              </button>

              <button
                className={`acc-tab-btn ${activeAccordion === 'data' ? 'active' : ''}`}
                onClick={() => setActiveAccordion('data')}
              >
                <User size={14} /> Data
              </button>

              <button
                className={`acc-tab-btn ${activeAccordion === 'blocks' ? 'active' : ''}`}
                onClick={() => setActiveAccordion('blocks')}
              >
                <Layout size={14} /> Blocks
              </button>
            </div>

            <div className="inspector-content-scroll">
              {/* Accordion 1: Theme & Colors */}
              {activeAccordion === 'theme' && (
                <div className="accordion-section">
                  <div className="prop-field">
                    <label className="prop-label">Dark Mode Frame</label>
                    <button
                      className={`toggle-frame-btn ${customization.darkMode ? 'active' : ''}`}
                      onClick={() => updateProp('darkMode', !customization.darkMode)}
                    >
                      {customization.darkMode ? '🌙 Dark Frame On' : '☀️ Light Frame On'}
                    </button>
                  </div>

                  <div className="prop-field">
                    <label className="prop-label">Primary Brand Color</label>
                    <div className="color-picker-input-group">
                      <input
                        type="color"
                        value={customization.primaryColor}
                        onChange={(e) => updateProp('primaryColor', e.target.value)}
                        className="color-swatch-box"
                      />
                      <input
                        type="text"
                        value={customization.primaryColor}
                        onChange={(e) => updateProp('primaryColor', e.target.value)}
                        className="prop-text-input color-hex"
                      />
                    </div>
                  </div>

                  <div className="prop-field">
                    <label className="prop-label">Background Color</label>
                    <div className="color-picker-input-group">
                      <input
                        type="color"
                        value={customization.backgroundColor || '#ffffff'}
                        onChange={(e) => updateProp('backgroundColor', e.target.value)}
                        className="color-swatch-box"
                      />
                      <input
                        type="text"
                        value={customization.backgroundColor || '#ffffff'}
                        onChange={(e) => updateProp('backgroundColor', e.target.value)}
                        className="prop-text-input color-hex"
                      />
                    </div>
                  </div>

                  <div className="prop-field">
                    <label className="prop-label">Text Color</label>
                    <div className="color-picker-input-group">
                      <input
                        type="color"
                        value={customization.textColor || '#1e293b'}
                        onChange={(e) => updateProp('textColor', e.target.value)}
                        className="color-swatch-box"
                      />
                      <input
                        type="text"
                        value={customization.textColor || '#1e293b'}
                        onChange={(e) => updateProp('textColor', e.target.value)}
                        className="prop-text-input color-hex"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Accordion 2: Data Props */}
              {activeAccordion === 'data' && (
                <div className="accordion-section">
                  <div className="prop-field">
                    <label className="prop-label">Brand / App Name</label>
                    <input
                      type="text"
                      value={customization.brandName}
                      onChange={(e) => updateProp('brandName', e.target.value)}
                      className="prop-text-input"
                    />
                  </div>

                  <div className="prop-field">
                    <label className="prop-label">Recipient Name</label>
                    <input
                      type="text"
                      value={customization.recipientName}
                      onChange={(e) => updateProp('recipientName', e.target.value)}
                      className="prop-text-input"
                    />
                  </div>

                  <div className="prop-field">
                    <label className="prop-label">Company / Organization</label>
                    <input
                      type="text"
                      value={customization.companyName}
                      onChange={(e) => updateProp('companyName', e.target.value)}
                      className="prop-text-input"
                    />
                  </div>

                  {customization.invoiceNumber !== undefined && (
                    <div className="prop-field">
                      <label className="prop-label">Invoice Number</label>
                      <input
                        type="text"
                        value={customization.invoiceNumber}
                        onChange={(e) => updateProp('invoiceNumber', e.target.value)}
                        className="prop-text-input"
                      />
                    </div>
                  )}

                  {customization.totalAmount !== undefined && (
                    <div className="prop-field">
                      <label className="prop-label">Total Amount</label>
                      <input
                        type="text"
                        value={customization.totalAmount}
                        onChange={(e) => updateProp('totalAmount', e.target.value)}
                        className="prop-text-input"
                      />
                    </div>
                  )}

                  {customization.eventName !== undefined && (
                    <div className="prop-field">
                      <label className="prop-label">Event / Conference</label>
                      <input
                        type="text"
                        value={customization.eventName}
                        onChange={(e) => updateProp('eventName', e.target.value)}
                        className="prop-text-input"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Accordion 3: Layout Blocks */}
              {activeAccordion === 'blocks' && (
                <div className="accordion-section">
                  <div className="block-toggle-row">
                    <label htmlFor="toggle-cta">Call-to-Action Button</label>
                    <input
                      type="checkbox"
                      id="toggle-cta"
                      checked={customization.showCTA}
                      onChange={(e) => updateProp('showCTA', e.target.checked)}
                    />
                  </div>

                  <div className="block-toggle-row">
                    <label htmlFor="toggle-socials">Social Media Badges</label>
                    <input
                      type="checkbox"
                      id="toggle-socials"
                      checked={customization.showSocials}
                      onChange={(e) => updateProp('showSocials', e.target.checked)}
                    />
                  </div>

                  <div className="block-toggle-row">
                    <label htmlFor="toggle-footer">Legal Footer Bar</label>
                    <input
                      type="checkbox"
                      id="toggle-footer"
                      checked={customization.showFooter}
                      onChange={(e) => updateProp('showFooter', e.target.checked)}
                    />
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Center Preview Canvas Stage */}
        <main className="standalone-canvas-stage">
          <div className="canvas-scroll-area">
            {isCompare ? (
              /* 3-Column Side-By-Side Renderers Grid */
              <div className="standalone-compare-grid">
                <div className="compare-card">
                  <div className="compare-card-head">
                    <div className="head-title">
                      <Globe size={15} /> 🌐 Web Page Renderer
                    </div>
                    <span className="badge-tag web">HTML5 FLEXBOX</span>
                  </div>
                  <LiveIframeHtml
                    html={getRenderedHtml('web')}
                    title="Web Renderer"
                    className="compare-card-iframe"
                  />
                </div>

                <div className="compare-card">
                  <div className="compare-card-head">
                    <div className="head-title">
                      <Mail size={15} /> 📧 Email Renderer
                    </div>
                    <span className="badge-tag email">XHTML TABLES</span>
                  </div>
                  <LiveIframeHtml
                    html={getRenderedHtml('email')}
                    title="Email Renderer"
                    className="compare-card-iframe"
                  />
                </div>

                <div className="compare-card">
                  <div className="compare-card-head">
                    <div className="head-title">
                      <Printer size={15} /> 📄 Document Renderer
                    </div>
                    <span className="badge-tag document">PDF / PRINT SPEC</span>
                  </div>
                  <LiveIframeHtml
                    html={getRenderedHtml('document')}
                    title="Document Renderer"
                    className="compare-card-iframe"
                  />
                </div>
              </div>
            ) : (
              /* Single Viewport Stage */
              <div className={`standalone-viewport-container ${deviceFrame}`}>
                <div className="viewport-browser-bar">
                  <div className="win-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="browser-url-display">
                    https://elementcraft-studio.local/{selectedTemplate.id}/{stageMode}
                  </div>
                  <div className="renderer-status-tag">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>LIVE</span>
                  </div>
                </div>

                <LiveIframeHtml
                  html={getRenderedHtml(stageMode as RenderMode)}
                  title="Studio Stage Render"
                  className="viewport-stage-iframe"
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

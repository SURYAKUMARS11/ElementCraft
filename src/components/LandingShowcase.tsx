import React, { useState } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { TEMPLATES } from '../templates';
import type { TemplateDefinition, RenderMode } from '../types/template';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Mail,
  Printer,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  ShieldCheck,
  Layers,
  ExternalLink,
  ChevronRight,
  Terminal,
} from 'lucide-react';

interface Props {
  onLaunchStudio: (templateId?: string) => void;
  onOpenExporter: () => void;
}

export const LandingShowcase: React.FC<Props> = ({ onLaunchStudio, onOpenExporter }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDefinition>(TEMPLATES[0]);
  const [activeMode, setActiveMode] = useState<RenderMode>('email');
  const [primaryColor, setPrimaryColor] = useState<string>('#6366f1');
  const [copiedJsx, setCopiedJsx] = useState(false);

  // Generate live preview HTML for hero widget
  const heroCustomization = {
    ...selectedTemplate.defaultCustomization,
    primaryColor: primaryColor,
  };

  const Component = selectedTemplate.component;

  const heroHtml = React.useMemo(() => {
    try {
      return renderToHtml(<Component config={heroCustomization} mode={activeMode} />, {
        title: selectedTemplate.name,
        mode: activeMode,
      });
    } catch {
      return '<div style="padding:20px;color:red;">Rendering preview...</div>';
    }
  }, [selectedTemplate, activeMode, primaryColor]);

  const handleCopyJsx = () => {
    const jsxStr = selectedTemplate.getRawJsx(heroCustomization);
    navigator.clipboard.writeText(jsxStr);
    setCopiedJsx(true);
    setTimeout(() => setCopiedJsx(false), 2000);
  };

  return (
    <div className="landing-page-wrapper">
      {/* Glow Orbs background */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={16} className="text-amber" />
          <span>Code-First Email &amp; Document Engine</span>
          <span className="badge-highlight">v2.0 Pro</span>
        </div>

        <h1 className="hero-title">
          Craft Bulletproof Emails &amp; Documents <br />
          <span className="gradient-text">Directly in React JSX</span>
        </h1>

        <p className="hero-subtitle">
          Powered by <strong>@unlayer/react-elements</strong>. Write modular, type-safe React components once and automatically render email-safe HTML tables, responsive web layouts, and print-ready PDF documents.
        </p>

        <div className="hero-cta-group">
          <button className="btn-primary-glow" onClick={() => onLaunchStudio()}>
            <Sparkles size={18} />
            <span>Launch Interactive Studio</span>
            <ArrowRight size={16} />
          </button>

          <button className="btn-secondary-glass" onClick={onOpenExporter}>
            <Code2 size={18} />
            <span>Export Code &amp; Templates</span>
          </button>
        </div>

        {/* Hero Interactive Sandbox Preview Widget */}
        <div className="hero-sandbox-container">
          <div className="sandbox-header">
            <div className="sandbox-controls-left">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
              <span className="sandbox-tag">LIVE INTERACTIVE DEMO</span>
            </div>

            {/* Template Selector dropdown in hero */}
            <div className="sandbox-controls-right">
              <select
                className="select-template-dropdown"
                value={selectedTemplate.id}
                onChange={(e) => {
                  const found = TEMPLATES.find((t) => t.id === e.target.value);
                  if (found) setSelectedTemplate(found);
                }}
              >
                {TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category.toUpperCase()})
                  </option>
                ))}
              </select>

              {/* Mode Segmented Switch */}
              <div className="hero-mode-switch">
                <button
                  className={`switch-item ${activeMode === 'email' ? 'active' : ''}`}
                  onClick={() => setActiveMode('email')}
                >
                  <Mail size={13} /> Email
                </button>
                <button
                  className={`switch-item ${activeMode === 'web' ? 'active' : ''}`}
                  onClick={() => setActiveMode('web')}
                >
                  <Globe size={13} /> Web
                </button>
                <button
                  className={`switch-item ${activeMode === 'document' ? 'active' : ''}`}
                  onClick={() => setActiveMode('document')}
                >
                  <Printer size={13} /> PDF
                </button>
              </div>

              {/* Quick Color Picker */}
              <div className="color-swatch-picker" title="Change Primary Brand Color">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="hero-color-input"
                />
              </div>

              <button
                className="btn-launch-hero"
                onClick={() => onLaunchStudio(selectedTemplate.id)}
              >
                Customize in Studio →
              </button>
            </div>
          </div>

          <div className="sandbox-stage">
            <iframe
              key={`hero-${selectedTemplate.id}-${activeMode}-${primaryColor}`}
              srcDoc={heroHtml}
              title="Hero Live Render Preview"
              className="hero-iframe"
              sandbox="allow-popups allow-same-origin"
            />
          </div>
        </div>
      </section>

      {/* Architectural Pillars / Features */}
      <section className="features-grid-section">
        <div className="section-heading">
          <span className="pill-category">CORE ADVANTAGES</span>
          <h2>Why @unlayer/react-elements Changes Everything</h2>
          <p>Stop writing raw HTML tables by hand. Leverage the full power of modern React.</p>
        </div>

        <div className="feature-cards-container">
          <div className="feature-card">
            <div className="icon-box purple">
              <Layers size={24} />
            </div>
            <h3>One Tree, Three Outputs</h3>
            <p>
              Define your template component tree once. Render it seamlessly to email XHTML tables, web responsive flexboxes, or print-ready PDF specs.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box emerald">
              <ShieldCheck size={24} />
            </div>
            <h3>100% Email Client Safe</h3>
            <p>
              Tested for Outlook, Gmail, Apple Mail, and Yahoo. Generates MSO conditional comments and bulletproof nested tables automatically.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box blue">
              <Terminal size={24} />
            </div>
            <h3>Type-Safe &amp; SSR Native</h3>
            <p>
              Full TypeScript prop autocomplete for speeds, paddings, colors, and margins. Zero hydration overhead for Next.js, Remix, and Vite.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box amber">
              <Zap size={24} />
            </div>
            <h3>Visual Builder JSON Sync</h3>
            <p>
              Bi-directional round-trip conversion using <code>renderToJson()</code>. Load code-first templates directly into Unlayer visual drag-and-drop editors.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Original Templates Showcase */}
      <section className="templates-showcase-section">
        <div className="section-heading">
          <span className="pill-category">ORIGINAL TEMPLATE SUITE</span>
          <h2>5 Production-Ready Templates Built with React</h2>
          <p>Explore original designs engineered for high engagement and deliverability.</p>
        </div>

        <div className="landing-template-grid">
          {TEMPLATES.map((t) => (
            <div key={t.id} className="landing-tpl-card">
              <div className="card-top-bar">
                <span className={`cat-pill ${t.category}`}>
                  {t.category === 'email' ? <Mail size={12} /> : <Printer size={12} />}
                  {t.category.toUpperCase()}
                </span>
                <span className="badge-pill-small">{t.badge}</span>
              </div>

              <h3 className="tpl-card-heading">{t.name}</h3>
              <p className="tpl-card-body">{t.description}</p>

              <div className="tpl-card-footer">
                <span className="spec-info">
                  <CheckCircle2 size={13} className="text-emerald" />
                  {t.recommendedMode.toUpperCase()} SPEC READY
                </span>
                <button
                  className="btn-card-launch"
                  onClick={() => onLaunchStudio(t.id)}
                >
                  Open Studio <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Playground Section */}
      <section className="code-playground-section">
        <div className="playground-box">
          <div className="playground-left">
            <span className="pill-category">DEVELOPER EXPERIENCE</span>
            <h2>Write Clean React. Export Production HTML.</h2>
            <p>
              No fragile strings or bloated builders. Import standard components like <code>&lt;Email&gt;</code>, <code>&lt;Row&gt;</code>, <code>&lt;Column&gt;</code>, and <code>&lt;Heading&gt;</code>.
            </p>

            <div className="code-features-list">
              <div className="list-item">
                <CheckCircle2 size={16} className="text-indigo" />
                <span>Full TypeScript autocompletion for semantic layout props</span>
              </div>
              <div className="list-item">
                <CheckCircle2 size={16} className="text-indigo" />
                <span>Standardized ColumnLayouts (1, 2, 3, 4, and wide/narrow ratios)</span>
              </div>
              <div className="list-item">
                <CheckCircle2 size={16} className="text-indigo" />
                <span>Automatic inline style compilation for maximum deliverability</span>
              </div>
            </div>

            <div className="playground-action-row">
              <button className="btn-primary-glow" onClick={() => onLaunchStudio()}>
                <Sparkles size={16} /> Open Full Studio Builder
              </button>
            </div>
          </div>

          <div className="playground-right">
            <div className="code-editor-header">
              <div className="file-name">
                <Code2 size={14} /> SaaSWelcomeEmail.tsx
              </div>
              <button className="btn-copy-code" onClick={handleCopyJsx}>
                {copiedJsx ? <Check size={14} /> : <Copy size={14} />}
                {copiedJsx ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="code-pre-box">
              <code>{selectedTemplate.getRawJsx(heroCustomization)}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="submission-banner-section">
        <div className="banner-card">
          <div className="banner-content">
            <span className="banner-badge">UNLAYER ELEMENTS STUDIO</span>
            <h2>Ready to shape the future of email &amp; document templates?</h2>
            <p>Explore the full interactive studio, customize template presets, and export HTML/JSON code instantly.</p>
          </div>
          <div className="banner-buttons">
            <button className="btn-primary-glow large" onClick={() => onLaunchStudio()}>
              Launch Studio Now →
            </button>
            <a
              href="https://github.com/unlayer/elements"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary-glass large"
            >
              Unlayer Elements Repo <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="brand-title">
              ElementCraft <span className="brand-tag">Studio</span>
            </div>
            <p>Built with ❤️ using @unlayer/react-elements.</p>
          </div>
          <div className="footer-right">
            <a href="https://unlayer.com" target="_blank" rel="noreferrer">
              Unlayer Official Website
            </a>
            <a href="https://docs.unlayer.com" target="_blank" rel="noreferrer">
              Elements Documentation
            </a>
            <a href="https://github.com/unlayer/elements" target="_blank" rel="noreferrer">
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

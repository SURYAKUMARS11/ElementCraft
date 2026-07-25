import React from 'react';
import { ShieldCheck, CheckCircle2, Code2, BookOpen, Layers, Zap, Terminal, ExternalLink } from 'lucide-react';

export const DocsView: React.FC = () => {
  return (
    <div className="docs-view-container">
      <div className="docs-header">
        <div className="gallery-badge">
          <BookOpen size={16} className="text-indigo" />
          <span>TECHNICAL DOCUMENTATION &amp; ARCHITECTURE</span>
        </div>
        <h1>@unlayer/react-elements Integration Specs</h1>
        <p>Comprehensive guide to the component hierarchy, rendering pipelines, and deliverability optimizations.</p>
      </div>

      <div className="docs-grid-content">
        <div className="docs-card">
          <h2><Layers size={20} className="text-purple" /> Component Tree Architecture</h2>
          <p>
            Unlayer Elements enforces a structured tree: <code>&lt;Body&gt;</code> (or <code>&lt;Email&gt;</code>/<code>&lt;Page&gt;</code>/<code>&lt;Document&gt;</code>) → <code>&lt;Row&gt;</code> → <code>&lt;Column&gt;</code> → Item Components (<code>&lt;Heading&gt;</code>, <code>&lt;Paragraph&gt;</code>, <code>&lt;Button&gt;</code>, <code>&lt;Image&gt;</code>, <code>&lt;Table&gt;</code>, <code>&lt;Divider&gt;</code>, <code>&lt;Social&gt;</code>).
          </p>
          <pre className="docs-code-block">
{`<Email backgroundColor="#f8fafc" contentWidth="600px">
  <Row padding="24px 0">
    <Column backgroundColor="#ffffff" borderRadius="16px" padding="32px">
      <Heading level="h1">Welcome!</Heading>
      <Paragraph color="#64748b">Your workspace is ready.</Paragraph>
      <Button href="https://unlayer.com" backgroundColor="#6366f1">
        Get Started →
      </Button>
    </Column>
  </Row>
</Email>`}
          </pre>
        </div>

        <div className="docs-card">
          <h2><Zap size={20} className="text-amber" /> Render Modes Comparison</h2>
          <ul className="docs-list">
            <li>
              <strong>📧 Email Mode (<code>renderToHtml(..., &#123; mode: 'email' &#125;)</code>)</strong>:
              Outputs XHTML Transitional doctype, MSO conditional comments for Outlook, nested <code>&lt;table&gt;</code> elements, and safe inline styling.
            </li>
            <li>
              <strong>🌐 Web Mode (<code>renderToHtml(..., &#123; mode: 'web' &#125;)</code>)</strong>:
              Outputs modern HTML5 Flexbox/Div layouts for landing pages and web portals.
            </li>
            <li>
              <strong>📄 Document Mode (<code>renderToHtml(..., &#123; mode: 'document' &#125;)</code>)</strong>:
              Optimized for print styles and PDF generation engines like Puppeteer, PDFShift, or DocRaptor.
            </li>
          </ul>
        </div>

        <div className="docs-card">
          <h2><Terminal size={20} className="text-emerald" /> Unlayer Builder JSON Sync</h2>
          <p>
            Convert React component trees into Unlayer&apos;s DesignJSON schema format using <code>renderToJson()</code>:
          </p>
          <pre className="docs-code-block">
{`import { renderToJson, Email, Row, Column, Paragraph } from '@unlayer/react-elements';

const designJson = renderToJson(
  <Email><Row><Column><Paragraph>Hello</Paragraph></Column></Row></Email>
);
// Exports schemaVersion, counters, body structure compatible with Unlayer Drag & Drop Editor.`}
          </pre>
        </div>

        <div className="docs-card">
          <h2><ShieldCheck size={20} className="text-blue" /> Deliverability &amp; Compatibility</h2>
          <div className="compliance-grid">
            <div className="comp-item">
              <CheckCircle2 size={16} className="text-emerald" />
              <span>Gmail Desktop &amp; Mobile</span>
            </div>
            <div className="comp-item">
              <CheckCircle2 size={16} className="text-emerald" />
              <span>Microsoft Outlook 2016-2026 (MSO)</span>
            </div>
            <div className="comp-item">
              <CheckCircle2 size={16} className="text-emerald" />
              <span>Apple Mail iOS &amp; macOS</span>
            </div>
            <div className="comp-item">
              <CheckCircle2 size={16} className="text-emerald" />
              <span>Yahoo Mail &amp; AOL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="docs-footer-cta">
        <a
          href="https://github.com/unlayer/elements"
          target="_blank"
          rel="noreferrer"
          className="btn-primary-glow"
        >
          <Code2 size={18} />
          <span>Official Unlayer Elements Repository</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

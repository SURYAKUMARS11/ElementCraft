import React from 'react';
import { Sparkles, ExternalLink, FileCode2, Code, Sun, Moon, Home, Sliders, LayoutGrid, BookOpen } from 'lucide-react';

export type ActiveNavTab = 'landing' | 'studio' | 'gallery' | 'docs';

interface Props {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenExporter: () => void;
}

export const Header: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  onOpenExporter,
}) => {
  return (
    <header className="studio-header">
      <div className="header-brand" onClick={() => onSelectTab('landing')} style={{ cursor: 'pointer' }}>
        <div className="brand-icon-wrapper">
          <Sparkles size={22} />
        </div>
        <div>
          <h1 className="brand-title">
            ElementCraft <span className="brand-tag">Studio</span>
          </h1>
          <p className="brand-subtitle">
            Powered by <strong>@unlayer/react-elements</strong>
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="header-nav-center">
        <button
          className={`nav-link ${activeTab === 'landing' ? 'active' : ''}`}
          onClick={() => onSelectTab('landing')}
        >
          <Home size={15} /> Home Showcase
        </button>

        <button
          className={`nav-link ${activeTab === 'studio' ? 'active' : ''}`}
          onClick={() => onSelectTab('studio')}
        >
          <Sliders size={15} /> Live Studio Builder
        </button>

        <button
          className={`nav-link ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => onSelectTab('gallery')}
        >
          <LayoutGrid size={15} /> Template Suite
        </button>

        <button
          className={`nav-link ${activeTab === 'docs' ? 'active' : ''}`}
          onClick={() => onSelectTab('docs')}
        >
          <BookOpen size={15} /> Specs &amp; Docs
        </button>
      </nav>

      {/* Action Controls */}
      <div className="header-actions">
        <div className="header-badge-challenge">
          <Sparkles size={14} className="trophy-gold" />
          <span>v2.0 Pro</span>
        </div>

        <button className="theme-toggle-btn" onClick={onToggleTheme} title="Toggle Light/Dark Studio">
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button className="btn-export-trigger" onClick={onOpenExporter}>
          <FileCode2 size={16} />
          <span>Export Center</span>
        </button>

        <a
          href="https://github.com/unlayer/elements"
          target="_blank"
          rel="noreferrer"
          className="btn-icon-link"
          title="Unlayer Elements Repository"
        >
          <Code size={16} />
        </a>

        <a
          href="https://docs.unlayer.com"
          target="_blank"
          rel="noreferrer"
          className="btn-icon-link"
          title="Unlayer Documentation"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </header>
  );
};
